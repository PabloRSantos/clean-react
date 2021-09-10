import React from 'react'
import {
  cleanup,
  fireEvent,
  render,
  screen,
  RenderResult
} from '@testing-library/react'
import { Login } from './login'
import { AuthenticationSpy, ValidationStub } from '@/presentation/test'
import faker from 'faker'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
};

type SutParams = {
  validationError: string
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <Login validation={validationStub} authentication={authenticationSpy} />
  )

  return {
    sut,
    authenticationSpy
  }
}

const simulateValidSubmit = (
  email = faker.internet.email(),
  password = faker.internet.password()
): void => {
  populateEmailField(email)

  populatePasswordField(password)

  const submitButton = screen.getByRole('button', { name: 'Entrar' })
  fireEvent.click(submitButton)
}

const populateEmailField = (email = faker.internet.email()): void => {
  const emailInput = screen.getByPlaceholderText('Digite seu e-mail')
  fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = (password = faker.internet.password()): void => {
  const passwordInput = screen.getByPlaceholderText('Digite sua senha')
  fireEvent.input(passwordInput, { target: { value: password } })
}

const simulateStatusForField = (fieldName: string, validationError?: string): void => {
  const fieldStatus = screen.getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError || 'Tudo certo!')
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

describe('Login Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    const erorrWrap = sut.getByTestId('error-wrap')
    expect(erorrWrap.childElementCount).toBe(0)

    const submitButton = sut.getByRole('button', {
      name: 'Entrar'
    }) as HTMLButtonElement
    expect(submitButton.disabled).toBeTruthy()

    simulateStatusForField('email', validationError)
    simulateStatusForField('password', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    populateEmailField()
    simulateStatusForField('email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    populatePasswordField()
    simulateStatusForField('password', validationError)
  })

  test('Should show valid email state if Validation succeeds', () => {
    makeSut()
    populateEmailField()
    simulateStatusForField('email')
  })

  test('Should show valid password state if Validation succeeds', () => {
    makeSut()
    populatePasswordField()
    simulateStatusForField('password')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()

    populateEmailField()
    populatePasswordField()

    const submitButton = sut.getByRole('button', {
      name: 'Entrar'
    }) as HTMLButtonElement
    expect(submitButton.disabled).toBeFalsy()
  })

  test('Should show spinner on submit', () => {
    const { sut } = makeSut()
    simulateValidSubmit()
    const spinner = sut.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  test('Should call Authentication with correct values', () => {
    const { authenticationSpy } = makeSut()

    const email = faker.internet.email()
    const password = faker.internet.password()
    simulateValidSubmit(email, password)

    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  test('Should call Authentication only once', () => {
    const { authenticationSpy } = makeSut()

    simulateValidSubmit()
    simulateValidSubmit()

    expect(authenticationSpy.callsCount).toBe(1)
  })
})
