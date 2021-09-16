import { render, fireEvent, screen } from '@testing-library/react'
import React from 'react'
import faker from 'faker'
import { Input } from '..'
import { FormContext } from '@/presentation/contexts/form/form-context'

const makeSut = (fieldName: string): void => {
  render(
    <FormContext.Provider value={{ state: {} }}>
      <Input name={fieldName} />
    </FormContext.Provider>
  )
}

describe('Input Component', () => {
  test('Should begin with readOnly', () => {
    const field = faker.database.column()
    makeSut(field)
    const input = screen.getByTestId(field) as HTMLInputElement

    expect(input.readOnly).toBe(true)
  })

  test('Should remove readOnly on focus', () => {
    const field = faker.database.column()
    makeSut(field)
    const input = screen.getByTestId(field) as HTMLInputElement

    fireEvent.focus(input)

    expect(input.readOnly).toBe(false)
  })

  test('Should focus input on label click', () => {
    const field = faker.database.column()
    makeSut(field)
    const input = screen.getByTestId(field)
    const label = screen.getByTestId(`${field}-label`)
    fireEvent.click(label)

    expect(document.activeElement).toBe(input)
  })
})
