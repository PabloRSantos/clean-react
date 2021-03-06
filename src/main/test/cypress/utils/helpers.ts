const baseUrl: string = Cypress.config().baseUrl

export const testHttpCallsCont = (count: number): void => {
  cy.get('@request.all').should('have.length', count)
}

export const testUrl = (path: string): void => {
  cy.url().should('eq', `${baseUrl}${path}`)
}

export const testLocalStorageItem = (key: string): void => {
  cy.window().then((window) =>
    assert.isOk(window.localStorage.getItem(key))
  )
}

export const setLocalStorageItem = (key: string, value: object): void => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getLocalStorageItem = (key: string): any => {
  const result = localStorage.getItem(key)

  return JSON.parse(result)
}
