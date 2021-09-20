import * as Http from './http-mocks'

export const mockUnexpectedError = (): void => {
  cy.server()
  Http.mockServerError(/surveys/, 'GET')
}

export const mockAccessDeniedError = (): void => {
  cy.server()
  Http.mockForbiddenError(/surveys/, 'GET')
}
