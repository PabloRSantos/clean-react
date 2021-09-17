import { ApiContext } from '@/presentation/contexts'
import React, { memo, MouseEvent, useContext } from 'react'
import { useHistory } from 'react-router'
import { Logo } from '..'
import Styles from './header-styles.scss'

const Header: React.FC = memo(() => {
  const { setCurrentAccount } = useContext(ApiContext)
  const history = useHistory()

  const logout = (e: MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault()
    setCurrentAccount(undefined)
    history.replace('/login')
  }

  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logoutWrap}>
          <span>Rodrigo</span>
          <a href="#" onClick={logout} >Sair</a>
        </div>
      </div>
    </header>
  )
})

export { Header }
