/**
 * Restrict navigation to a route if a user is not logged in.
 */
import React from 'react'
import { isLoggedIn } from './services/AuthService'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const loggedIn = isLoggedIn()

  return (
    <Route
      {...rest}
      render={props =>
        loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/eats', state: { from: props.location } }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
