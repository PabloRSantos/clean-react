import React, { memo } from 'react'
import { Logo } from '../logo/logo'
import Styles from './login-header-styles.scss'

export const LoginHeader: React.FC = memo(() => {
  return (
    <header className={Styles.headerWrap}>
      <Logo />
      <h1>4Dev - Enquetes para Programadores</h1>
    </header>
  )
})
