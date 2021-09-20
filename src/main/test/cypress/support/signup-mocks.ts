import faker from 'faker'
import * as Http from './http-mocks'

export const mockEmailInUseError = (): void => {
  cy.server()
  Http.mockForbiddenError(/signup/, 'POST')
}

export const mockUnexpectedError = (): void => {
  cy.server()
  Http.mockServerError(/signup/, 'POST')
}

export const mockOk = (): void => {
  cy.server()
  Http.mockOk(/signup/, 'POST', {
    accessToken: faker.datatype.uuid(),
    name: faker.name.findName()
  })
}
