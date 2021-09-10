import React from 'react'
import {
  cleanup,
  fireEvent,
  render,
  RenderResult
} from '@testing-library/react'
import { Login } from './login'
import { ValidationStub } from '@/presentation/test'
import faker from 'faker'
import { Authentication, AuthenticationParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
};

type SutParams = {
  validationError: string
};

class AuthenticationSpy implements Authentication {
  account = mockAccountModel();
  params: AuthenticationParams;
  async auth (params: AuthenticationParams): Promise<AccountModel> {
    this.params = params

    return Promise.resolve(this.account)
  }
}

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

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🔴')

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationError)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    const emailInput = sut.getByPlaceholderText('Digite sua senha')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🔴')
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    const passwordInput = sut.getByPlaceholderText('Digite sua senha')
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() }
    })

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationError)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut()

    const emailInput = sut.getByPlaceholderText('Digite sua senha')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('Tudo certo!')
    expect(emailStatus.textContent).toBe('🟢')
  })

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut()

    const passwordInput = sut.getByPlaceholderText('Digite sua senha')
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() }
    })

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Tudo certo!')
    expect(passwordStatus.textContent).toBe('🟢')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()

    const emailInput = sut.getByPlaceholderText('Digite seu e-mail')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    const passwordInput = sut.getByPlaceholderText('Digite sua senha')
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() }
    })

    const submitButton = sut.getByRole('button', {
      name: 'Entrar'
    }) as HTMLButtonElement
    expect(submitButton.disabled).toBeFalsy()
  })

  test('Should show spinner on submit', () => {
    const { sut } = makeSut()

    const emailInput = sut.getByPlaceholderText('Digite seu e-mail')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    const passwordInput = sut.getByPlaceholderText('Digite sua senha')
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() }
    })

    const submitButton = sut.getByRole('button', { name: 'Entrar' })
    fireEvent.click(submitButton)

    const spinner = sut.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  test('Should call Authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut()

    const email = faker.internet.email()
    const emailInput = sut.getByPlaceholderText('Digite seu e-mail')
    fireEvent.input(emailInput, { target: { value: email } })

    const password = faker.internet.password()
    const passwordInput = sut.getByPlaceholderText('Digite sua senha')
    fireEvent.input(passwordInput, { target: { value: password } })

    const submitButton = sut.getByRole('button', { name: 'Entrar' })
    fireEvent.click(submitButton)

    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })
})
