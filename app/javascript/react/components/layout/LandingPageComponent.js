import React from "react"
import { Link, useHistory } from "react-router-dom"
import CustomButton from "../templates/CustomButton"
import BiographyComponent from "./BiographyComponent"

const LandingPageComponent = (props) => {

    const history = useHistory()

    const redirectFunc = (url) => {
        history.push(url)
    }

    return (
        <div className="grid-container text-center">
            <div className="grid-x grid-padding-x grid-margin-x align-center">
                <h1 className="cell small-12 landing-title">Welcome to Recipedia!</h1>

                <CustomButton 
                className="cell small-2"
                text="View Recipes" 
                callback={() => {redirectFunc('/recipes')}}/>

                <h3 className="cell small-12 bio">Welcome to recipedia. A website full of recipes, as well as people discussing their culinary endeavors. If meal ideas are what you are after, give our recipes section a peak. If you are here to talk with other amateur chefs, check out the forum!</h3>
                <BiographyComponent className="cell small-8"/>
            </div>
        </div>
    )
}

export default LandingPageComponent