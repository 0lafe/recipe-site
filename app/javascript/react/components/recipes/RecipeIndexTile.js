import React from "react"
import { Link } from "react-router-dom"

const RecipeIndexTile = (props) => {
    const { recipe } = props
    return (
        <Link to={`recipes/${recipe.id}`}>
            <div className="recipe-tile">
                <span>{recipe.title}</span>
            </div>
        </Link>
    )
}

export default RecipeIndexTile