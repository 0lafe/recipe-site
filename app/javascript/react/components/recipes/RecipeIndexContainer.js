import React, { useEffect, useState } from "react"
import helperFetch from "../helpers/Fetcher"
import RecipeIndexTile from "./RecipeIndexTile"
import RecipeSearch from "./RecipeSearch"

const RecipeIndexContainer = (props) => {
    const { recipes, setRecipes } = props

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
            <RecipeSearch setRecipes={setRecipes}/>
            {tiles}
        </div>
    )
}

export default RecipeIndexContainer