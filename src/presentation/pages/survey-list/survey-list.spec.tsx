import React from 'react'
import { LoadSurveyListSpy } from '@/presentation/test/mock-load-survey-list'
import { render, screen } from '@testing-library/react'
import { SurveyList } from '..'
import { UnexpectedError } from '@/domain/errors'

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
}

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  render(<SurveyList loadSurveyList={loadSurveyListSpy} />)

  return { loadSurveyListSpy }
}

describe('SurveyListComponent', () => {
  test('Should present 4 empty items on start', () => {
    makeSut()
    const surveyList = screen.getByRole('list')
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
    expect(screen.queryByRole('button', { name: /recarregar/i })).not.toBeInTheDocument()
  })

  test('Should call LoadSurveyList', () => {
    const { loadSurveyListSpy } = makeSut()
    expect(loadSurveyListSpy.callsCount).toBe(1)
  })

  test('Should render SurveyItems on success', async () => {
    const { loadSurveyListSpy } = makeSut()
    const surveyItems = await screen.findAllByTestId('survey-item')
    expect(surveyItems).toHaveLength(loadSurveyListSpy.surveys.length)
    expect(screen.queryByRole('button', { name: /recarregar/i })).not.toBeInTheDocument()
  })

  test('Should render error on failure', async () => {
    const error = new UnexpectedError()

    const loadSurveyListSpy = new LoadSurveyListSpy()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(error)
    makeSut(loadSurveyListSpy)

    expect(await screen.findByText(error.message)).toBeInTheDocument()
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })
})
