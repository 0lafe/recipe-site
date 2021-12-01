import React, { useState } from "react"
import { Redirect } from "react-router-dom"

const RecipeSearch = (props) => {
    const { setRecipes } = props
    const [searchParams, setSearchParams] = useState("")
    const [searched, setSearched] = useState(false)

    const handleChange = (event) => {
        setSearchParams(event.currentTarget.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        getRecipes()
        setSearchParams("")
    }

    const createParams = () => {
        let offset = 0
        let url = `api/v1/spoon_recipes?search=${searchParams}&offset=${offset}`
        return url
    }

    const getRecipes = async () => {
        const response = await fetch(createParams())
        // const response = require("./testSearch.json")
        const responseJSON = await response.json()
        setRecipes(responseJSON.results)
        setSearched(true)
    }

    if (searched) {
        return (
            <Redirect to="/recipes/search"/>
        )
    }

    return (
        <div className="cell small-8">
            <div className="search-text">
                <span>Search for a recipe here</span>
            </div>
            <form onSubmit={handleSubmit} className="search-field">
                <input className="search-bar" type="text" value={searchParams} onChange={handleChange}/>
                <input className="search-button" type="submit" value="🔍"/>
            </form>
        </div>
    )
}

export default RecipeSearch