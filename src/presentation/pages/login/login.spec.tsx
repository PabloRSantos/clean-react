import React from 'react'
import {
  cleanup,
  render,
  screen,
  RenderResult,
  waitFor,
  fireEvent
} from '@testing-library/react'
import { Login } from '@/presentation/pages'
import {
  AuthenticationSpy,
  SaveAccessTokenMock,
  ValidationStub,
  Helper
} from '@/presentation/test'
import faker from 'faker'
import { InvalidCredentialsError } from '@/domain/errors'
import { Router } from 'react-router'
import { createMemoryHistory } from 'history'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
  saveAccessTokenMock: SaveAccessTokenMock
};

type SutParams = {
  validationError: string
};

const history = createMemoryHistory({ initialEntries: ['/login'] })
const makeSut = (params?: SutParams): SutTypes => {
  const saveAccessTokenMock = new SaveAccessTokenMock()
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <Router history={history}>
      <Login
        saveAccessToken={saveAccessTokenMock}
        validation={validationStub}
        authentication={authenticationSpy}
      />
    </Router>
  )

  return {
    sut,
    authenticationSpy,
    saveAccessTokenMock
  }
}

const simulateValidSubmit = (
  email = faker.internet.email(),
  password = faker.internet.password()
): void => {
  Helper.populateField('email', email)

  Helper.populateField('password', password)

  const submitButton = screen.getByRole('button', { name: 'Entrar' })
  fireEvent.click(submitButton)
}

describe('Login Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    Helper.testChildCount('error-wrap', 0)

    Helper.testButtonIsDisabled('Entrar', true)

    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)
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

  test('Should enable submit button if form is valid', () => {
    makeSut()

    Helper.populateField('email')
    Helper.populateField('password')

    Helper.testButtonIsDisabled('Entrar', false)
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

  test('Should not call Authentication if form is invalid', () => {
    const validationError = faker.random.words()
    const { authenticationSpy } = makeSut({ validationError })

    simulateValidSubmit()

    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should present error if Authentication fails', async () => {
    const { authenticationSpy, sut } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error)

    await waitFor(() => simulateValidSubmit())

    const mainError = sut.getByText(error.message)
    expect(mainError).toBeTruthy()

    const spinner = sut.queryByTestId('spinner')
    expect(spinner).toBeFalsy()

    Helper.testChildCount('error-wrap', 1)
  })

  test('Should call SaveAccessToken on success', async () => {
    const { authenticationSpy, saveAccessTokenMock } = makeSut()

    await waitFor(() => simulateValidSubmit())

    expect(saveAccessTokenMock.accessToken).toBe(
      authenticationSpy.account.accessToken
    )
    expect(history).toHaveLength(1)
    expect(history.location.pathname).toBe('/')
  })

  test('Should present error if SaveAccessToken fails', async () => {
    const { sut, saveAccessTokenMock } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(saveAccessTokenMock, 'save').mockRejectedValueOnce(error)

    await waitFor(() => simulateValidSubmit())

    const mainError = sut.getByText(error.message)
    expect(mainError).toBeTruthy()

    Helper.testChildCount('error-wrap', 1)
  })

  test('Should go to singup page', () => {
    const { sut } = makeSut()

    const register = sut.getByText(/criar conta/i)
    fireEvent.click(register)

    expect(history).toHaveLength(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
