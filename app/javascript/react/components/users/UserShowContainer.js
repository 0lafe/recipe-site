import React from "react"
import RecipeIndexTile from "../recipes/RecipeIndexTile"

const UserShowContainer = (props) => {
    const { user } = props

    let userData = <p>Sorry you are not signed in!</p>
    if (user) {
        userData = (
            <div className="grid-container text-center">
                <div className="grid-x grid-padding-x grid-margin-x align-center grid-padding-y">
                <span className="cell small-8 user-title">Welcome {user.username}</span>
                <span className="cell small-8 user-title">Here are all the recipes you have favorited</span>
                    {user.recipes.map(recipe => {
                        return (
                            <RecipeIndexTile key={recipe.id}
                            classname="recipe-tile cell small-8"
                            recipe={recipe}/>
                        )
                    })}
                </div>
            </div>
        )
    } 
    
    return (
        <div>
            {userData}
        </div>
    )
}

export default UserShowContainer