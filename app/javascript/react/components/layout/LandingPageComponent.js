import React from "react"
import { Link } from "react-router-dom"

const LandingPageComponent = () => {
    return (
        <div>
            <h1>Welcome!</h1>
            <Link to="/recipes">Recipes</Link>
        </div>
    )
}

export default LandingPageComponent