import { SurveyList } from '@/presentation/pages'
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { makeLogin } from '@/main/factories/pages/login/login-factory'
import { makeSignUp } from '@/main/factories/pages/signup/signup-factory'

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={makeLogin} exact/>
        <Route path='/signup' component={makeSignUp} exact/>
        <Route path='/' component={SurveyList} exact/>
      </Switch>
    </BrowserRouter>
  )
}
