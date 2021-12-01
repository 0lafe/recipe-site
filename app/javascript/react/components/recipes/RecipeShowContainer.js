import React, { useEffect, useState } from "react"
import helperFetch from "../helpers/Fetcher"

const RecipeShowContainer = (props) => {
    const [recipe, setRecipe] = useState(null)
    let recipeShow

    useEffect(() => {
        helperFetch(`/api/v1/recipes/${props.match.params.id}`).then(receivedRecipe => {
            setRecipe(receivedRecipe[0])
        })
    }, [])

    const checkIfUrl = (string) => {
        let url;
        try {
          url = new URL(string);
        } catch (_) {
          return false;  
        }
        return url.protocol === "http:" || url.protocol === "https:";
    }

    if (recipe) {
        let imageSrc = ""
        if (recipe.image) {
            imageSrc = <img className="recipe-show-image" src={recipe.image}/>
        }
        let stepTiles
        if (checkIfUrl(recipe.instructions)){
            stepTiles = <span>Sorry we don't have the instructions but you can find them <a href={recipe.instructions}>here!</a></span>
        } else {
            const recipeList = recipe.instructions.split(".")
            recipeList.pop()
            stepTiles = recipeList.map(step => {
                return (
                    <li key={step} className="instruction">{step}</li>
                )
            })
        }

        const ingredientTiles = recipe.ingredients.split(":=:").map(ingredient => {
            return (
                <li key={ingredient} className="ingredient">{ingredient}</li>
            )
        })

        recipeShow = (
            <div className="recipe-show-tile grid-x grid-padding-x grid-margin-x align-center grid-padding-y">
                <h2 className="recipe-title text-center cell small-8">{recipe.title}</h2>
                <div className="cell small-8 text-center">
                    {imageSrc}
                </div>
                <div className="ingredient-container cell small-6">
                    <span className="ingredient-title">Ingredients:</span>
                    <ul className="ingredients-list">{ingredientTiles}</ul>
                </div>
                <div className="step-container cell small-6">
                    <span className="instructions-text">Instructions:</span>
                    <ul className="recipe-steps">{stepTiles}</ul>
                </div>
            </div>
        )
    }

    return (
        <div className="grid-container">
                {recipeShow}
        </div>
    )
}

export default RecipeShowContainer