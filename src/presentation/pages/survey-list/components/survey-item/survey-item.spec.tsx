import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { SurveyItem } from './survey-item'
import { mockSurveyModel } from '@/domain/test'
import { IconName } from '@/presentation/components'
import { Router } from 'react-router'
import { createMemoryHistory, MemoryHistory } from 'history'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (survey = mockSurveyModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })

  render(
    <Router history={history}>
      <SurveyItem survey={survey}/>
    </Router>
  )

  return { history }
}

describe('SurveyItem Component', () => {
  test('Should render with correct values', () => {
    const survey = {
      ...mockSurveyModel(),
      didAnswer: true,
      date: new Date('2020-01-10T00:00:00')
    }
    makeSut(survey)

    expect(screen.getByRole('img')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByText(survey.question)).toBeInTheDocument()
    const spanDay = screen.getByText('10')
    const spanMonth = screen.getByText('jan')
    const spanYear = screen.getByText('2020')

    expect(spanDay).toBeInTheDocument()
    expect(spanMonth).toBeInTheDocument()
    expect(spanYear).toBeInTheDocument()
  })

  test('Should render with correct values', () => {
    const survey = {
      ...mockSurveyModel(),
      didAnswer: false,
      date: new Date('2019-05-03T00:00:00')
    }
    makeSut(survey)

    expect(screen.getByRole('img')).toHaveProperty('src', IconName.thumbDown)
    expect(screen.getByText(survey.question)).toBeInTheDocument()

    const spanDay = screen.getByText('03')
    const spanMonth = screen.getByText('mai')
    const spanYear = screen.getByText('2019')

    expect(spanDay).toBeInTheDocument()
    expect(spanMonth).toBeInTheDocument()
    expect(spanYear).toBeInTheDocument()
  })

  test('Should go to SurveyResult', () => {
    const survey = mockSurveyModel()
    const { history } = makeSut(survey)

    fireEvent.click(screen.getByText(/ver resultado/i))
    expect(history.location.pathname).toBe(`/surveys/${survey.id}`)
  })
})
