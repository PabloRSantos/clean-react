import React from 'react'
import { render, screen } from '@testing-library/react'
import { Calendar } from '@/presentation/components'

const makeSut = (date: Date): void => {
  render(<Calendar date={date}/>)
}

describe('Calendar Component', () => {
  test('Should render with correct values', () => {
    makeSut(new Date('2020-01-10T00:00:00'))

    const spanDay = screen.getByText('10')
    const spanMonth = screen.getByText('jan')
    const spanYear = screen.getByText('2020')

    expect(spanDay).toBeInTheDocument()
    expect(spanMonth).toBeInTheDocument()
    expect(spanYear).toBeInTheDocument()
  })

  test('Should render with correct values', () => {
    makeSut(new Date('2019-05-03T00:00:00'))

    const spanDay = screen.getByText('03')
    const spanMonth = screen.getByText('mai')
    const spanYear = screen.getByText('2019')

    expect(spanDay).toBeInTheDocument()
    expect(spanMonth).toBeInTheDocument()
    expect(spanYear).toBeInTheDocument()
  })
})
