
import { Input, FormStatus, Footer, LoginHeader } from '@/presentation/components'
import { FormContext } from '@/presentation/contexts/form/form-context'
import React, { useState } from 'react'
import Styles from './login-styles.scss'

type StateProps = {
  isLoading: boolean
  errorMessage: string
}

export const Login: React.FC = () => {
  const [state] = useState<StateProps>({
    isLoading: false,
    errorMessage: ''
  })

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <FormContext.Provider value={state}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <button className={Styles.submit} disabled type="submit">Entrar</button>
          <span className={Styles.link}>Criar conta</span>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}