import React, { useEffect, useState } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import helperFetch from './helpers/Fetcher'
import LandingPageComponent from './layout/LandingPageComponent'
import NavBar from './layout/NavBar'
import RecipeIndexContainer from './recipes/RecipeIndexContainer'
import RecipeSearchContainer from './recipes/RecipeSearchContainer'
import RecipeShowContainer from './recipes/RecipeShowContainer'
import UserShowContainer from './users/UserShowContainer'

export const App = (props) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    helperFetch('/api/v1/users').then(userData => {
      if (userData) {
        setCurrentUser(userData.user)
      }
    })
  }, [])

  return (
    <BrowserRouter>
      <NavBar currentUser={currentUser}/>
      <Switch>
        <Route exact path="/" component={LandingPageComponent}/>
        <Route exact path="/recipes">
          <RecipeIndexContainer recipes={recipes}
          setRecipes={setRecipes}/>
        </Route>
        <Route exact path="/recipes/search/:query" render={props =>
          <RecipeSearchContainer recipes={recipes}
          setRecipes={setRecipes}
          routeProps={props}/>
        }/>
        <Route exact path="/recipes/:id" render={props => <RecipeShowContainer user={currentUser} routeProps={props}/>} />
        <Route exact path="/user">
          <UserShowContainer user={currentUser}/>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
