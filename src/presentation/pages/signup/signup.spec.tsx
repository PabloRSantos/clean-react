import React from 'react'
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  screen
} from '@testing-library/react'
import { SignUp } from '@/presentation/pages'
import { AddAccountSpy, Helper, ValidationStub } from '@/presentation/test'
import faker from 'faker'

type SutTypes = {
  sut: RenderResult
  addAccountSpy: AddAccountSpy
};

type SutParams = {
  validationError: string
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError

  const addAccountSpy = new AddAccountSpy()
  const sut = render(
    <SignUp
      validation={validationStub}
      addAccount={addAccountSpy}
    />
  )

  return {
    sut,
    addAccountSpy
  }
}

const simulateValidSubmit = (
  name = faker.name.findName(),
  email = faker.internet.email(),
  password = faker.internet.password()
): void => {
  Helper.populateField('Digite seu nome', name)
  Helper.populateField('Digite seu e-mail', email)
  Helper.populateField('Digite sua senha', password)
  Helper.populateField('Repita sua senha', password)

  const submitButton = screen.getByRole('button', { name: 'Entrar' })
  fireEvent.click(submitButton)
}

describe('SignUp Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.testChildCount('error-wrap', 0)
    Helper.testButtonIsDisabled('Entrar', true)
    Helper.testStatusForField('name', validationError)
    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)
    Helper.testStatusForField('passwordConfirmation', validationError)
  })

  test('Should show name error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('Digite seu nome')
    Helper.testStatusForField('name', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('Digite seu e-mail')
    Helper.testStatusForField('email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('Digite sua senha')
    Helper.testStatusForField('password', validationError)
  })

  test('Should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('Repita sua senha')
    Helper.testStatusForField('passwordConfirmation', validationError)
  })

  test('Should show valid name state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('Digite seu nome')
    Helper.testStatusForField('name')
  })

  test('Should show valid email state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('Digite seu e-mail')
    Helper.testStatusForField('email')
  })

  test('Should show valid password state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('Digite sua senha')
    Helper.testStatusForField('password')
  })

  test('Should show valid passwordConfirmation state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('Repita sua senha')
    Helper.testStatusForField('passwordConfirmation')
  })

  test('Should enable submit button if form is valid', () => {
    makeSut()

    Helper.populateField('Digite seu nome')
    Helper.populateField('Digite seu e-mail')
    Helper.populateField('Digite sua senha')
    Helper.populateField('Repita sua senha')

    Helper.testButtonIsDisabled('Entrar', false)
  })

  test('Should show spinner on submit', () => {
    const { sut } = makeSut()
    simulateValidSubmit()
    const spinner = sut.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  test('Should call AddAccount with correct values', () => {
    const { addAccountSpy } = makeSut()

    const name = faker.name.findName()
    const email = faker.internet.email()
    const password = faker.internet.password()
    simulateValidSubmit(name, email, password)

    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password
    })
  })
})
