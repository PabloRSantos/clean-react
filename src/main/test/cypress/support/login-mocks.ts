import faker from 'faker'
import * as Http from './http-mocks'

export const mockInvalidCredentialsError = (): void => {
  cy.server()
  Http.mockUnauthorizedError(/login/)
}

export const mockUnexpectedError = (): void => {
  cy.server()
  Http.mockServerError(/login/, 'POST')
}

export const mockOk = (): void => {
  cy.server()
  Http.mockOk(/login/, 'POST', {
    accessToken: faker.datatype.uuid(),
    name: faker.name.findName()
  })
}
