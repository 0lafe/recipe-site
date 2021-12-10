import React from "react"
import { Link } from "react-router-dom"

const RecipeIndexTile = (props) => {
    const { recipe } = props

    let id = recipe.id
    if (recipe.api_id) {
        id = recipe.api_id
    }

    let imageSrc = recipe.image
    if (!recipe.image) {
        imageSrc = "https://steamuserimages-a.akamaihd.net/ugc/26223900985750635/5182552889AF62A2AE66B8C79CD41D1FF66B03AD/?imw=512&imh=511&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true"
    }
    
    return (
        <div className="cell small-6">
            <Link to={`/recipes/${id}`}>
                <div className="recipe-tile">
                    <img className="recipe-tile-image" src={imageSrc}/>
                    <span className="recipe-tile-text">{recipe.title}</span>
                </div>
            </Link>
        </div>
    )
}

export default RecipeIndexTile