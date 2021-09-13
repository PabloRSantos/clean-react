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
  ValidationStub
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

const testStatusForField = (
  fieldName: string,
  validationError?: string
): void => {
  const fieldStatus = screen.getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError || 'Tudo certo!')
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

const testErrorWrapChildCount = (count: number): void => {
  const errorWrap = screen.getByTestId('error-wrap')
  expect(errorWrap.childElementCount).toBe(count)
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

describe('Login Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    testErrorWrapChildCount(0)

    testButtonIsDisabled('Entrar', true)

    testStatusForField('email', validationError)
    testStatusForField('password', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    populateEmailField()
    testStatusForField('email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    populatePasswordField()
    testStatusForField('password', validationError)
  })

  test('Should show valid email state if Validation succeeds', () => {
    makeSut()
    populateEmailField()
    testStatusForField('email')
  })

  test('Should show valid password state if Validation succeeds', () => {
    makeSut()
    populatePasswordField()
    testStatusForField('password')
  })

  test('Should enable submit button if form is valid', () => {
    makeSut()

    populateEmailField()
    populatePasswordField()

    testButtonIsDisabled('Entrar', false)
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

    testErrorWrapChildCount(1)
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

    testErrorWrapChildCount(1)
  })

  test('Should go to singup page', () => {
    const { sut } = makeSut()

    const register = sut.getByText(/criar conta/i)
    fireEvent.click(register)

    expect(history).toHaveLength(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
