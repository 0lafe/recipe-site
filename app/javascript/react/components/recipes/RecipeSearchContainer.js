import React from "react"
import RecipeIndexTile from "./RecipeIndexTile"

const RecipeSearchContainer = (props) => {
    const { recipes, setRecipes } = props

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

export default RecipeSearchContainer