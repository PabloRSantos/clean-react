import { ApiContext } from '@/presentation/contexts'
import React, { useContext } from 'react'
import { Redirect, Route, RouteProps } from 'react-router'

const PrivateRoute: React.FC<RouteProps> = (props) => {
  const { getCurrentAccount } = useContext(ApiContext)

  return getCurrentAccount()?.accessToken ? <Route {...props} /> : <Route {...props} component={() => <Redirect to="/login" />} />
}

export { PrivateRoute }
