import faker from 'faker'
import * as Helper from './http-mocks'

export const mockEmailInUseError = (): void => {
  cy.server()
  Helper.mockEmailInUseError(/signup/)
}

export const mockUnexpectedError = (): void => {
  cy.server()
  Helper.mockUnexpectedError(/signup/, 'POST')
}

export const mockOk = (): void => {
  cy.server()
  Helper.mockOk(/signup/, 'POST', {
    accessToken: faker.datatype.uuid()
  })
}

export const mockInvalidData = (): void => {
  cy.server()
  Helper.mockOk(/signup/, 'POST', {
    invalidProperty: faker.random.words()
  })
}
