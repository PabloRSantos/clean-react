import React from 'react'
import {
  cleanup,
  render,
  RenderResult
} from '@testing-library/react'
import { SignUp } from '@/presentation/pages'
import { Helper } from '@/presentation/test'

type SutTypes = {
  sut: RenderResult
};

const makeSut = (): SutTypes => {
  const sut = render(
    <SignUp />
  )

  return {
    sut
  }
}

describe('SignUp Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = 'Campo obrigatório'
    makeSut()
    Helper.testChildCount('error-wrap', 0)
    Helper.testButtonIsDisabled('Entrar', true)
    Helper.testStatusForField('name', validationError)
    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)
    Helper.testStatusForField('passwordConfirmation', validationError)
  })
})
