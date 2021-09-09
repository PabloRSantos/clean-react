import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { Login } from '@/presentation/pages'

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={Login} exact/>
      </Switch>
    </BrowserRouter>
  )
}
