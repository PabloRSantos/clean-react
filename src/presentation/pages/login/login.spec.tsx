import React from 'react'
import { render, screen } from '@testing-library/react'
import { Login } from './login'

describe('Login Component', () => {
  test('Should start with initial state', () => {
    render(<Login />)

    const erorrWrap = screen.getByTestId('error-wrap')
    expect(erorrWrap.childElementCount).toBe(0)

    const submitButton = screen.getByRole('button', { name: 'Entrar' }) as HTMLButtonElement
    expect(submitButton.disabled).toBeTruthy()
  })
})
