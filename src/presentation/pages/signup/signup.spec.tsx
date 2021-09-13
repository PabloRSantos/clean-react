import React from 'react'
import {
  cleanup,
  render,
  RenderResult,
  screen
} from '@testing-library/react'
import { SignUp } from '@/presentation/pages'

type SutTypes = {
  sut: RenderResult
};

const makeSut = (): SutTypes => {
  const sut = render(
    <SignUp />
  )

  return {
    sut
  }
}

const testChildCount = (field: string, count: number): void => {
  const el = screen.getByTestId('error-wrap')
  expect(el.childElementCount).toBe(count)
}

const testButtonIsDisabled = (
  buttonText: string,
  isDisabled: boolean
): void => {
  const button = screen.getByRole('button', {
    name: buttonText
  }) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

const testStatusForField = (
  fieldName: string,
  validationError?: string
): void => {
  const fieldStatus = screen.getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError || 'Tudo certo!')
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

describe('SignUp Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = 'Campo obrigatório'
    makeSut()
    testChildCount('error-wrap', 0)
    testButtonIsDisabled('Entrar', true)
    testStatusForField('name', validationError)
    testStatusForField('email', validationError)
    testStatusForField('password', validationError)
    testStatusForField('passwordConfirmation', validationError)
  })
})
