import React from "react"
import { Link } from "react-router-dom"

const RecipeIndexTile = (props) => {
    const { recipe } = props

    let id
    if (recipe.api_id) {
        id = recipe.api_id
    } else {
        id = recipe.id
    }
    
    return (
        <Link to={`/recipes/${id}`}>
            <div className="recipe-tile">
                <span>{recipe.title}</span>
            </div>
        </Link>
    )
}

export default RecipeIndexTile