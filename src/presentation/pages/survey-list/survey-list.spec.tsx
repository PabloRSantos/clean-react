import React from 'react'
import { LoadSurveyListSpy } from '@/presentation/test/mock-load-survey-list'
import { render, screen } from '@testing-library/react'
import { SurveyList } from '..'

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
}

const makeSut = (): SutTypes => {
  const loadSurveyListSpy = new LoadSurveyListSpy()
  render(<SurveyList loadSurveyList={loadSurveyListSpy} />)

  return { loadSurveyListSpy }
}

describe('SurveyListComponent', () => {
  test('Should present 4 empty items on start', () => {
    makeSut()
    const surveyList = screen.getByRole('list')
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
  })

  test('Should call LoadSurveyList', () => {
    const { loadSurveyListSpy } = makeSut()
    expect(loadSurveyListSpy.callsCount).toBe(1)
  })

  test('Should render SurveyItems on success', async () => {
    const { loadSurveyListSpy } = makeSut()
    const surveyItems = await screen.findAllByTestId('survey-item')
    expect(surveyItems).toHaveLength(loadSurveyListSpy.surveys.length)
  })
})
