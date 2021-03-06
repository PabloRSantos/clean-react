import faker from 'faker'
import * as FormHelper from '../utils/form-helper'
import * as Http from '../utils/http-mocks'
import * as Helper from '../utils/helpers'

const path = /login/
const mockInvalidCredentialsError = (): void => {
  cy.server()
  Http.mockUnauthorizedError(path)
}

const mockUnexpectedError = (): void => {
  cy.server()
  Http.mockServerError(path, 'POST')
}

const mockSuccess = (): void => {
  cy.server()
  Http.mockOk(path, 'POST', 'fx:account')
}

const populateFields = (): void => {
  cy.getByTestId('email').focus().type(faker.internet.email())
  cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
}

const simulateValidSubmit = (): void => {
  populateFields()
  cy.contains('Entrar').click()
}

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('email').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('email', 'Campo obrigatório')

    cy.getByTestId('password').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('password', 'Campo obrigatório')

    cy.contains('Entrar').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word())
    FormHelper.testInputStatus('email', 'Valor inválido')

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
    FormHelper.testInputStatus('password', 'Valor inválido')

    cy.contains('Entrar').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email())
    FormHelper.testInputStatus('email')

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    FormHelper.testInputStatus('password')

    cy.contains('Entrar').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present InvalidCredentialsError on 401', () => {
    mockInvalidCredentialsError()
    simulateValidSubmit()
    cy.getByTestId('error-wrap')
    FormHelper.testMainError('Credenciais inválidas')

    Helper.testUrl('/login')
  })

  it('Should present UnexpectedError on default error cases', () => {
    mockUnexpectedError()
    simulateValidSubmit()
    cy.getByTestId('error-wrap')
    FormHelper.testMainError(
      'Algo de errado aconteceu. Tente novamente em breve'
    )

    Helper.testUrl('/login')
  })

  it('Should save account if valid credentials are provided', () => {
    mockSuccess()
    simulateValidSubmit()

    cy.getByTestId('error-wrap').should('not.have.descendants')
    Helper.testUrl('/')
    Helper.testLocalStorageItem('account')
  })

  it('Should prevent multiple submits', () => {
    mockSuccess()
    populateFields()
    cy.contains('Entrar').dblclick()
    cy.wait('@request')
    Helper.testHttpCallsCont(1)
  })

  it('Should not call submit if form is invalid', () => {
    mockSuccess()
    cy.getByTestId('email')
      .focus()
      .type(faker.internet.email())
      .type('{enter}')
    Helper.testHttpCallsCont(0)
  })
})
