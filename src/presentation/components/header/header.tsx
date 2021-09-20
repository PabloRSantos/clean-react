import { ApiContext } from '@/presentation/contexts'
import { useLogout } from '@/presentation/hooks'
import React, { memo, MouseEvent, useContext } from 'react'
import { Logo } from '..'
import Styles from './header-styles.scss'

const Header: React.FC = memo(() => {
  const { getCurrentAccount } = useContext(ApiContext)
  const logout = useLogout()

  const handleLogout = (e: MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault()
    logout()
  }

  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logoutWrap}>
          <span data-testid="username">{getCurrentAccount().name}</span>
          <a href="#" data-testid="logout" onClick={handleLogout} >Sair</a>
        </div>
      </div>
    </header>
  )
})

export { Header }
