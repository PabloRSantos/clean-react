import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ApiContext } from '@/presentation/contexts'
import {
  getCurrentAccountAdapter,
  setCurrentAccountAdapter
} from '@/main/adapters/current-account-adapter'
import { PrivateRoute } from '@/presentation/components'
import { makeLogin, makeSignUp, makeSurveyList, makeSurveyResult } from '@/main/factories/pages'

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
          <PrivateRoute path="/surveys/:id" component={makeSurveyResult} exact />
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}
