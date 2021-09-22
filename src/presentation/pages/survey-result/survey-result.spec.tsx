import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { SurveyResult } from '@/presentation/pages'
import { ApiContext } from '@/presentation/contexts'
import { mockAccountModel, mockSurveyResultModel } from '@/domain/test'
import { LoadSurveyResultSpy, SaveSurveyResultSpy } from '@/presentation/test'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router'
import { AccountModel } from '@/domain/models'

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy
  saveSurveyResultSpy: SaveSurveyResultSpy
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
};

type SutParams = {
  loadSurveyResultSpy?: LoadSurveyResultSpy
  saveSurveyResultSpy?: SaveSurveyResultSpy
};

const makeSut = ({
  saveSurveyResultSpy = new SaveSurveyResultSpy(),
  loadSurveyResultSpy = new LoadSurveyResultSpy()
}: SutParams = {}): SutTypes => {
  const history = createMemoryHistory({
    initialEntries: ['/', '/surveys/any_id'],
    initialIndex: 1
  })
  const setCurrentAccountMock = jest.fn()

  render(
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountMock,
        getCurrentAccount: () => mockAccountModel()
      }}
    >
      <Router history={history}>
        <SurveyResult
          loadSurveyResult={loadSurveyResultSpy}
          saveSurveyResult={saveSurveyResultSpy}
        />
      </Router>
    </ApiContext.Provider>
  )

  return {
    loadSurveyResultSpy,
    history,
    setCurrentAccountMock,
    saveSurveyResultSpy
  }
}

describe('SurveyResult Component', () => {
  test('Should present correct initial state', async () => {
    makeSut()
    const surveyResult = screen.getByTestId('survey-result')
    expect(surveyResult.childElementCount).toBe(0)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    await waitFor(() => surveyResult)
  })

  test('Should call LoadSurveyResult', async () => {
    const { loadSurveyResultSpy } = makeSut()
    await waitFor(() => screen.getByTestId('survey-result'))
    expect(loadSurveyResultSpy.callsCount).toBe(1)
  })

  test('Should present SurveyResult data on success', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    const surveyResult = {
      ...mockSurveyResultModel(),
      date: new Date('2020-01-10T00:00:00')
    }
    loadSurveyResultSpy.surveyResult = surveyResult
    makeSut({ loadSurveyResultSpy })
    await waitFor(() => screen.getByTestId('survey-result'))

    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('jan')).toBeInTheDocument()
    expect(screen.getByText('2020')).toBeInTheDocument()
    expect(screen.getByText(surveyResult.question)).toBeInTheDocument()
    expect(screen.getByTestId('answers').childElementCount).toBe(2)

    const answersWrap = screen.queryAllByTestId('answer-wrap')
    expect(answersWrap[0]).toHaveClass('active')
    expect(answersWrap[1]).not.toHaveClass('active')

    const images = screen.queryAllByTestId('answer-image')
    expect(images[0]).toHaveAttribute('src', surveyResult.answers[0].image)
    expect(images[0]).toHaveAttribute('alt', surveyResult.answers[0].answer)
    expect(images[1]).toBeFalsy()

    const answers = screen.queryAllByTestId('answer')
    expect(answers[0]).toHaveTextContent(surveyResult.answers[0].answer)
    expect(answers[1]).toHaveTextContent(surveyResult.answers[1].answer)

    const percents = screen.queryAllByTestId('percent')
    expect(percents[0]).toHaveTextContent(
      `${surveyResult.answers[0].percent}%`
    )
    expect(percents[1]).toHaveTextContent(
      `${surveyResult.answers[1].percent}%`
    )
  })

  test('Should render error on UnexpectedError', async () => {
    const error = new UnexpectedError()

    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    jest.spyOn(loadSurveyResultSpy, 'load').mockRejectedValueOnce(error)
    makeSut({ loadSurveyResultSpy })

    expect(screen.queryByTestId('question')).not.toBeInTheDocument()
    expect(await screen.findByText(error.message)).toBeInTheDocument()
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
  })

  test('Should logout on AccessDeniedError', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    jest
      .spyOn(loadSurveyResultSpy, 'load')
      .mockRejectedValueOnce(new AccessDeniedError())
    const { history, setCurrentAccountMock } = makeSut({ loadSurveyResultSpy })

    await waitFor(() => screen.getByTestId('survey-result'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })

  test('Should call LoadSurveyResult on reload', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    jest
      .spyOn(loadSurveyResultSpy, 'load')
      .mockRejectedValueOnce(new UnexpectedError())
    makeSut({ loadSurveyResultSpy })

    fireEvent.click(await screen.findByText(/recarregar/i))
    await waitFor(() => screen.getByTestId('survey-result'))

    expect(loadSurveyResultSpy.callsCount).toBe(1)
  })

  test('Should go to SurveyList on back button click', async () => {
    const { history } = makeSut()

    fireEvent.click(await screen.findByRole('button', { name: /voltar/i }))
    expect(history.location.pathname).toBe('/')
  })

  test('Should not present Loading on active answer click', async () => {
    makeSut()
    await waitFor(() => screen.getByTestId('survey-result'))
    const answersWrap = screen.queryAllByTestId('answer-wrap')
    fireEvent.click(answersWrap[0])
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
  })

  test('Should call SaveSurveyResult on non active answer click', async () => {
    const { saveSurveyResultSpy, loadSurveyResultSpy } = makeSut()
    await waitFor(() => screen.getByTestId('survey-result'))
    const answersWrap = screen.queryAllByTestId('answer-wrap')
    fireEvent.click(answersWrap[1])
    expect(screen.queryByTestId('loading')).toBeInTheDocument()
    expect(saveSurveyResultSpy.params).toEqual({
      answer: loadSurveyResultSpy.surveyResult.answers[1].answer
    })
  })

  test('Should render error on UnexpectedError', async () => {
    const error = new UnexpectedError()

    const saveSurveyResultSpy = new SaveSurveyResultSpy()
    jest.spyOn(saveSurveyResultSpy, 'save').mockRejectedValueOnce(error)
    makeSut({ saveSurveyResultSpy })

    await waitFor(() => screen.getByTestId('survey-result'))

    const answersWrap = screen.queryAllByTestId('answer-wrap')
    fireEvent.click(answersWrap[1])

    await waitFor(() => screen.getByTestId('survey-result'))

    expect(screen.queryByTestId('question')).not.toBeInTheDocument()
    expect(await screen.findByText(error.message)).toBeInTheDocument()
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
  })
})
