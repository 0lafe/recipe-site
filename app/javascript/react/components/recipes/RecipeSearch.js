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
        <form onSubmit={handleSubmit}>
            <input type="text" value={searchParams} onChange={handleChange}/>
            <input type="submit"/>
        </form>
    )
}

export default RecipeSearch