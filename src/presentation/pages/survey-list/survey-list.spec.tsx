import React from 'react'
import { LoadSurveyListSpy } from '@/presentation/test/mock-load-survey-list'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { SurveyList } from '..'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { ApiContext } from '@/presentation/contexts'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import { mockAccountModel } from '@/domain/test'
import { AccountModel } from '@/domain/models'

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const setCurrentAccountMock = jest.fn()
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => mockAccountModel() }}>
      <Router history={history}>
        <SurveyList loadSurveyList={loadSurveyListSpy} />
      </Router>
    </ApiContext.Provider>
  )

  return { loadSurveyListSpy, history, setCurrentAccountMock }
}

describe('SurveyListComponent', () => {
  test('Should present 4 empty items on start', async () => {
    makeSut()
    const surveyList = screen.getByRole('list')
    await waitFor(() => {
      expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
    })
    expect(screen.queryByRole('button', { name: /recarregar/i })).not.toBeInTheDocument()
  })

  test('Should call LoadSurveyList', async () => {
    const { loadSurveyListSpy } = makeSut()
    await waitFor(() => {
      expect(loadSurveyListSpy.callsCount).toBe(1)
    })
  })

  test('Should render SurveyItems on success', async () => {
    const { loadSurveyListSpy } = makeSut()
    const surveyItems = await screen.findAllByTestId('survey-item')
    expect(surveyItems).toHaveLength(loadSurveyListSpy.surveys.length)
    expect(screen.queryByRole('button', { name: /recarregar/i })).not.toBeInTheDocument()
  })

  test('Should render error on UnexpectedError', async () => {
    const error = new UnexpectedError()

    const loadSurveyListSpy = new LoadSurveyListSpy()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(error)
    makeSut(loadSurveyListSpy)

    expect(await screen.findByText(error.message)).toBeInTheDocument()
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })

  test('Should logout on AccessDeniedError', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(new AccessDeniedError())
    const { history, setCurrentAccountMock } = makeSut(loadSurveyListSpy)

    await waitFor(() => {
      expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    })
    expect(history.location.pathname).toBe('/login')
  })

  test('Should call LoadSurveyList on reload', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(new UnexpectedError())
    makeSut(loadSurveyListSpy)

    fireEvent.click(await screen.findByText(/recarregar/i))

    await waitFor(() => {
      expect(loadSurveyListSpy.callsCount).toBe(1)
    })
  })
})
