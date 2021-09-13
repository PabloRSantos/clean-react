import {
  Input,
  FormStatus,
  Footer,
  LoginHeader
} from '@/presentation/components'
import { FormContext } from '@/presentation/contexts/form/form-context'
import React, { useState } from 'react'
import Styles from './signup-styles.scss'

export const SignUp: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    nameError: 'Campo obrigatório',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    passwordConfirmationError: 'Campo obrigatório',
    mainError: ''
  })

  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <FormContext.Provider value={{ state }}>
        <form
          className={Styles.form}
        >
          <h2>Criar conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <Input
            type="password"
            name="passwordConfirmation"
            placeholder="Repita sua senha"
          />
          <button
            className={Styles.submit}
            type="submit"
            disabled
          >
            Entrar
          </button>
          <span className={Styles.link}>Voltar para login</span>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}
