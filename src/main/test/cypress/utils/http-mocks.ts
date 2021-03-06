import faker from 'faker'

export const mockUnauthorizedError = (url: RegExp): void => {
  cy.route({
    method: 'POST',
    url: url,
    status: 401,
    response: {
      error: faker.random.words()
    }
  }).as('request')
}

export const mockForbiddenError = (url: RegExp, method: string): void => {
  cy.route({
    method,
    url: url,
    status: 403,
    response: {
      error: faker.random.words()
    }
  }).as('request')
}

export const mockServerError = (url: RegExp, method: string): void => {
  cy.route({
    method,
    url: url,
    status: faker.helpers.randomize([400, 404, 500]),
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
