import React, { useEffect, useState } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import helperFetch from './helpers/Fetcher'
import LandingPageComponent from './layout/LandingPageComponent'

export const App = (props) => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    helperFetch('/api/v1/users').then(userData => {
      if (userData) {
        setCurrentUser(userData.user)
      }
    })
  }, [])

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPageComponent}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App
