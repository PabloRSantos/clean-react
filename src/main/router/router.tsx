import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { makeLogin } from '@/main/factories/pages/login/login-factory'
import { makeSignUp } from '@/main/factories/pages/signup/signup-factory'
import { ApiContext } from '@/presentation/contexts'
import {
  getCurrentAccountAdapter,
  setCurrentAccountAdapter
} from '@/main/adapters/current-account-adapter'
import { PrivateRoute } from '@/presentation/components'
import { makeSurveyList } from '../factories/pages'

export const Router: React.FC = () => {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter,
        getCurrentAccount: getCurrentAccountAdapter
      }}
    >
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={makeLogin} exact />
          <Route path="/signup" component={makeSignUp} exact />
          <PrivateRoute path="/" component={makeSurveyList} exact />
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}
