import React from "react"
import RecipeIndexTile from "./RecipeIndexTile"

const RecipeSearchContainer = (props) => {
    const { recipes, setRecipes } = props

    const tiles = recipes.map(recipe => {
        return (
            <RecipeIndexTile key={recipe.id}
            classname="recipe-tile cell small-8"
            recipe={recipe}/>
        )
    })

    return (
        <div className="grid-container text-center">
            <div className="grid-x grid-padding-x grid-margin-x align-center grid-padding-y">
                <div className="cell small-8">
                    <span className="search-text">Results:</span>
                </div>
                {tiles}
            </div>
        </div>
    )
}

export default RecipeSearchContainer