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
            classname="recipe-tile cell small-8"
            recipe={recipe}/>
        )
    })

    const refresh = (event) => {
        event.preventDefault()
        helperFetch('api/v1/recipes').then(recipes => {
            setRecipes(recipes)
        })
    }

    return (
        <div className="grid-container text-center">
            <div className="grid-x grid-padding-x grid-margin-x align-center grid-padding-y">
                <RecipeSearch setRecipes={setRecipes}/>
                <div className="random-recipes-text">
                    <span>Don't know what you want to make? Here are some random recipes you might be interested in!</span>
                </div>
                {tiles}
                <div className="cell small-8 refresh">
                    <span>Nothing catch your eye? Try refreshing the list </span>
                </div>
                <div className="cell">
                    <button className="clickable-button button" onClick={refresh}>Refresh</button>
                </div>
            </div>
        </div>
    )
}

export default RecipeIndexContainer