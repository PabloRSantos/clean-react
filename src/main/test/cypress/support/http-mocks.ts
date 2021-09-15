import faker from 'faker'

export const mockInvalidCredentialsError = (url: RegExp): void => {
  cy.route({
    method: 'POST',
    url: url,
    status: 401,
    response: {
      error: faker.random.words()
    }
  }).as('request')
}

export const mockUnexpectedError = (url: RegExp, method: string): void => {
  cy.route({
    method,
    url: url,
    status: 400,
    response: {
      error: faker.random.words()
    }
  }).as('request')
}

export const mockOk = (url: RegExp, method: string, response: any): void => {
  cy.route({
    method,
    url: url,
    status: 200,
    response
  }).as('request')
}
