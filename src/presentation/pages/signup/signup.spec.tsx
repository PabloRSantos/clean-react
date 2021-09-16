import React from 'react'
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  screen,
  waitFor
} from '@testing-library/react'
import { SignUp } from '@/presentation/pages'
import { AddAccountSpy, Helper, UpdateCurrentAccountMock, ValidationStub } from '@/presentation/test'
import faker from 'faker'
import { EmailInUseError } from '@/domain/errors'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

type SutTypes = {
  sut: RenderResult
  addAccountSpy: AddAccountSpy
  updateCurrentAccountMock: UpdateCurrentAccountMock
};

type SutParams = {
  validationError: string
};

const history = createMemoryHistory({ initialEntries: ['/signup'] })
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError

  const addAccountSpy = new AddAccountSpy()
  const updateCurrentAccountMock = new UpdateCurrentAccountMock()
  const sut = render(
    <Router history={history}>
      <SignUp
        validation={validationStub}
        addAccount={addAccountSpy}
        updateCurrentAccount={updateCurrentAccountMock}
      />
    </Router>
  )

  return {
    sut,
    addAccountSpy,
    updateCurrentAccountMock
  }
}

const simulateValidSubmit = (
  name = faker.name.findName(),
  email = faker.internet.email(),
  password = faker.internet.password()
): void => {
  Helper.populateField('name', name)
  Helper.populateField('email', email)
  Helper.populateField('password', password)
  Helper.populateField('passwordConfirmation', password)

  const submitButton = screen.getByRole('button', { name: 'Cadastrar' })
  fireEvent.click(submitButton)
}

describe('SignUp Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.testChildCount('error-wrap', 0)
    Helper.testButtonIsDisabled('Cadastrar', true)
    Helper.testStatusForField('name', validationError)
    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)
    Helper.testStatusForField('passwordConfirmation', validationError)
  })

  test('Should show name error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('name')
    Helper.testStatusForField('name', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('email')
    Helper.testStatusForField('email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('password')
    Helper.testStatusForField('password', validationError)
  })

  test('Should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('passwordConfirmation')
    Helper.testStatusForField('passwordConfirmation', validationError)
  })

  test('Should show valid name state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('name')
    Helper.testStatusForField('name')
  })

  test('Should show valid email state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('email')
    Helper.testStatusForField('email')
  })

  test('Should show valid password state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('password')
    Helper.testStatusForField('password')
  })

  test('Should show valid passwordConfirmation state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('passwordConfirmation')
    Helper.testStatusForField('passwordConfirmation')
  })

  test('Should enable submit button if form is valid', () => {
    makeSut()

    Helper.populateField('name')
    Helper.populateField('email')
    Helper.populateField('password')
    Helper.populateField('passwordConfirmation')

    Helper.testButtonIsDisabled('Cadastrar', false)
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

  test('Should call AddAccount only once', () => {
    const { addAccountSpy } = makeSut()

    simulateValidSubmit()
    simulateValidSubmit()

    expect(addAccountSpy.callsCount).toBe(1)
  })

  test('Should not call AddAccount if form is invalid', () => {
    const validationError = faker.random.words()
    const { addAccountSpy } = makeSut({ validationError })

    simulateValidSubmit()

    expect(addAccountSpy.callsCount).toBe(0)
  })

  test('Should present error if AddAccount fails', async () => {
    const { addAccountSpy, sut } = makeSut()
    const error = new EmailInUseError()
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)

    await waitFor(() => simulateValidSubmit())

    const mainError = sut.getByText(error.message)
    expect(mainError).toBeTruthy()

    const spinner = sut.queryByTestId('spinner')
    expect(spinner).toBeFalsy()

    Helper.testChildCount('error-wrap', 1)
  })

  test('Should call SaveAccessToken on success', async () => {
    const { addAccountSpy, updateCurrentAccountMock } = makeSut()

    await waitFor(() => simulateValidSubmit())

    expect(updateCurrentAccountMock.account).toEqual(
      addAccountSpy.account
    )
    expect(history).toHaveLength(1)
    expect(history.location.pathname).toBe('/')
  })

  test('Should present error if SaveAccessToken fails', async () => {
    const { sut, updateCurrentAccountMock } = makeSut()
    const error = new EmailInUseError()
    jest.spyOn(updateCurrentAccountMock, 'save').mockRejectedValueOnce(error)

    await waitFor(() => simulateValidSubmit())

    const mainError = sut.getByText(error.message)
    expect(mainError).toBeTruthy()

    Helper.testChildCount('error-wrap', 1)
  })

  test('Should go to login page', () => {
    const { sut } = makeSut()

    const loginLink = sut.getByText(/voltar para login/i)
    fireEvent.click(loginLink)

    expect(history).toHaveLength(1)
    expect(history.location.pathname).toBe('/login')
  })
})
