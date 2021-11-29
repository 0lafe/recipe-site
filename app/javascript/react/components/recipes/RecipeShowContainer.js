import React, { useEffect, useState } from "react"
import helperFetch from "../helpers/Fetcher"

const RecipeShowContainer = (props) => {
    const [recipe, setRecipe] = useState(null)

    let recipeShow
    let recipeLink
    useEffect(() => {
        helperFetch(`/api/v1/recipes/${props.match.params.id}`).then(receivedRecipe => {
            setRecipe(receivedRecipe)
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

        let instructions = <p>{recipe.instructions}</p>

        if (checkIfUrl(recipe.instructions)){
            instructions = <a href={recipe.instructions}>Sorry we don't have the instructions but you can find them here!</a>
        }
        recipeShow = (
            <div className="recipe-show-tile">
                <h2>{recipe.title}</h2>
                <hr/>
                <span>{recipe.ingredients}</span>
                <hr/>
                {instructions}
            </div>
        )
    }

    return (
        <div>
            {recipeShow}
        </div>
    )
}

export default RecipeShowContainer