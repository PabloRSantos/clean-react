import { render, screen } from '@testing-library/react'
import React from 'react'
import { SurveyList } from '..'

const makeSut = (): void => {
  render(<SurveyList />)
}

describe('SurveyListComponent', () => {
  test('Should present 4 empty items on start', () => {
    makeSut()
    const surveyList = screen.getByRole('list')
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
  })
})
