import React from 'react'
import { render, screen } from '@testing-library/react'
import { Login } from './login'

describe('Login Component', () => {
  test('Should not render spinner and error on start', () => {
    render(<Login />)

    const erorrWrap = screen.getByTestId('error-wrap')
    expect(erorrWrap.childElementCount).toBe(0)
  })
})
