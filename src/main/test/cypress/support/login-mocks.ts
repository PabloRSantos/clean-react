import faker from 'faker'
import * as Helper from './http-mocks'

export const mockInvalidCredentialsError = (): void => {
  cy.server()
  Helper.mockInvalidCredentialsError(/login/)
}

export const mockUnexpectedError = (): void => {
  cy.server()
  Helper.mockUnexpectedError(/login/, 'POST')
}

export const mockOk = (): void => {
  cy.server()
  Helper.mockOk(/login/, 'POST', {
    accessToken: faker.datatype.uuid()
  })
}

export const mockInvalidData = (): void => {
  cy.server()
  Helper.mockOk(/login/, 'POST', {
    invalidProperty: faker.random.words()
  })
}
