import React, { useEffect, useState } from "react"
import helperFetch from "../helpers/Fetcher"

const RecipeShowContainer = (props) => {
    const { user, routeProps } = props
    const [recipe, setRecipe] = useState(null)
    const [favorited, setFavorited] = useState(false)
    let recipeShow

    useEffect(() => {
        helperFetch(`/api/v1/recipes/${routeProps.match.params.id}`).then(receivedRecipe => {
            setRecipe(receivedRecipe.recipe)
            setFavorited(receivedRecipe.favorited)
        })
    }, [])

    const favorite = async (event) => {
        const response = await fetch('/api/v1/user_favorites', {
            method:"POST",
            headers:{
            "Content-Type": "application/json",
            "Accept": "application/json"
            },
            credentials:"same-origin",
            body: JSON.stringify({recipe: recipe.id})
        })
        const responseJson = await response.json()
        if (responseJson.success) {
            setFavorited(!favorited)
        }
    }

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

        let favoriteButton
        if (user) {
            let starText = "☆"
            if (favorited) {
                starText = "★"
            }
            favoriteButton = <button className="favorite-button" onClick={favorite}>{starText}</button>
        }

        recipeShow = (
            <div className="recipe-show-tile grid-x grid-padding-x grid-margin-x align-center grid-padding-y">
                <div className="cell small-8 recipe-tile-header">
                    <span className="recipe-title">{recipe.title}</span>
                    {favoriteButton}
                </div>
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