import { SurveyList } from '@/presentation/pages'
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

type Factory = {
  makeLogin: React.FC
  makeSignUp: React.FC
}

export const Router: React.FC<Factory> = (factory) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={factory.makeLogin} exact/>
        <Route path='/signup' component={factory.makeSignUp} exact/>
        <Route path='/' component={SurveyList} exact/>
      </Switch>
    </BrowserRouter>
  )
}
