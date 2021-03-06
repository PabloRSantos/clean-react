import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { ApiContext } from '@/presentation/contexts'
import { Header } from '..'
import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router'
import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'

type SutTypes = {
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const setCurrentAccountMock = jest.fn()
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => account }}>
      <Router history={history}>
        <Header />
      </Router>
    </ApiContext.Provider>)

  return { history, setCurrentAccountMock }
}

describe('Header Component', () => {
  test('Should call setCurrentAccount with null ', () => {
    const { history, setCurrentAccountMock } = makeSut()
    const logoutButton = screen.getByText(/sair/i)
    fireEvent.click(logoutButton)

    expect(history.location.pathname).toBe('/login')
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
  })

  test('Should render username correctly', () => {
    const account = mockAccountModel()
    makeSut(account)
    expect(screen.getByText(account.name)).toBeInTheDocument()
  })
})
