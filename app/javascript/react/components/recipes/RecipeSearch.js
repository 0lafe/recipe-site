import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import AutofillSearch from "../helpers/AutofillSearch"

const RecipeSearch = ({ setRecipes }) => {
    const [searchParams, setSearchParams] = useState("")
    const [searched, setSearched] = useState(false)
    const [focused, setFocused] = useState(false)

    const handleChange = (event) => {
        setSearchParams(event.currentTarget.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (searchParams.length > 0) {
            setSearched(true)
            setRecipes([])
        }
    }

    const disableFocus = () => {
        setTimeout(() => {setFocused(false)}, 250)
    }

    if (searched) {
        return (
            <Redirect to={`/recipes/search/${searchParams}`}/>
        )
    }

    return (
        <div className="cell small-8">
            <div className="search-text">
                <span>Search for a recipe here</span>
            </div>
            <form onSubmit={handleSubmit} className="search-field">
                <input className="search-bar" type="text" value={searchParams} onChange={handleChange} onFocus={() => {setFocused(true)}} onBlur={disableFocus} />
                <input className="search-button" type="submit" value="🔍"/>
            </form>
            <AutofillSearch searchParams={searchParams} focused={focused}/>
        </div>
    )
}

export default RecipeSearch