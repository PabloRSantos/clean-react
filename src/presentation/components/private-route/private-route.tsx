import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router'

const PrivateRoute: React.FC<RouteProps> = (props) => {
  return <Route {...props} component={() => <Redirect to="/login" />} />
}

export { PrivateRoute }
