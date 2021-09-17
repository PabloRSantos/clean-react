import React from 'react'
import { render, screen } from '@testing-library/react'
import { SurveyItem } from './survey-item'
import { mockSurveyModel } from '@/domain/test'
import { IconName } from '@/presentation/components'

describe('SurveyItem Component', () => {
  test('Should render with correct values', () => {
    const survey = mockSurveyModel()
    survey.didAnswer = true
    survey.date = new Date('2020-01-10T00:00:00')
    render(<SurveyItem survey={survey}/>)

    expect(screen.getByRole('img')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByText(survey.question)).toBeInTheDocument()

    const spanDay = screen.getByText('10')
    const spanMonth = screen.getByText('jan')
    const spanYear = screen.getByText('2020')

    expect(spanDay).toBeInTheDocument()
    expect(spanMonth).toBeInTheDocument()
    expect(spanYear).toBeInTheDocument()
  })
})
