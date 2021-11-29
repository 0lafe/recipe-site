import React, { useEffect, useState } from "react"
import helperFetch from "../helpers/Fetcher"
import RecipeIndexTile from "./RecipeIndexTile"

const RecipeIndexContainer = (props) => {
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        helperFetch('api/v1/recipes').then(recipes => {
            setRecipes(recipes)
        })
    }, [])

    const tiles = recipes.map(recipe => {
        return (
            <RecipeIndexTile key={recipe.id}
            recipe={recipe}/>
        )
    })

    return (
        <div>
            {tiles}
        </div>
    )
}

export default RecipeIndexContainer