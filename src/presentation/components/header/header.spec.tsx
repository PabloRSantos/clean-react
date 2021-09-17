import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { ApiContext } from '@/presentation/contexts'
import { Header } from '..'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router'

const history = createMemoryHistory({ initialEntries: ['/'] })

describe('Header Component', () => {
  test('Should call setCurrentAccount with null ', () => {
    const setCurrentAccountMock = jest.fn()
    render(
      <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
        <Router history={history}>
          <Header />
        </Router>
      </ApiContext.Provider>)

    const logoutButton = screen.getByText(/sair/i)
    fireEvent.click(logoutButton)

    expect(history.location.pathname).toBe('/login')
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
  })
})
