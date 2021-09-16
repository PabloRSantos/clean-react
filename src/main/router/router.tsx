import { SurveyList } from '@/presentation/pages'
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { makeLogin } from '@/main/factories/pages/login/login-factory'
import { makeSignUp } from '@/main/factories/pages/signup/signup-factory'
import { ApiContext } from '@/presentation/contexts'
import { setCurrentAccountAdapter } from '@/main/adapters/current-account-adapter'

export const Router: React.FC = () => {
  return (
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountAdapter }}>
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={makeLogin} exact/>
          <Route path='/signup' component={makeSignUp} exact/>
          <Route path='/' component={SurveyList} exact/>
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}
