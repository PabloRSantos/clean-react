import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

type Props = {
  makeLogin: React.FC
}

export const Router: React.FC<Props> = ({ makeLogin }) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={makeLogin} exact/>
      </Switch>
    </BrowserRouter>
  )
}
