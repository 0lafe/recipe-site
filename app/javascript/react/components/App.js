import React, { useEffect, useState } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import helperFetch from './helpers/Fetcher'
import LandingPageComponent from './layout/LandingPageComponent'
import RecipeIndexContainer from './recipes/RecipeIndexContainer'
import RecipeSearchContainer from './recipes/RecipeSearchContainer'
import RecipeShowContainer from './recipes/RecipeShowContainer'

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
      <Switch>
        <Route exact path="/" component={LandingPageComponent}/>
        <Route exact path="/recipes">
          <RecipeIndexContainer recipes={recipes}
          setRecipes={setRecipes}/>
        </Route>
        <Route exact path="/recipes/search/:query">
          <RecipeSearchContainer recipes={recipes}
          setRecipes={setRecipes}/>
        </Route>
        <Route exact path="/recipes/:id" component={RecipeShowContainer}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App
