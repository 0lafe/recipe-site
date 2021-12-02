import React, { useEffect, useState } from "react"
import RecipeIndexTile from "./RecipeIndexTile"
import helperFetch from "../helpers/Fetcher"
import DropDown from "../helpers/DropDown"

const RecipeSearchContainer = (props) => {
    const { recipes, setRecipes, routeProps } = props
    const [offset, setOffset] = useState(0)
    const [maxPerPage, setMaxPerPage] = useState(10)
    const [totalResults, setTotalResults] = useState(0)
    const [searchType, setSearchType] = useState("popularity")
    const [searchTypeOptions, setSearchTypeOptions] = useState([])

    useEffect(() => {
        helperFetch('/api/v1/spoon_recipes/new').then(searchTypes => {
            setSearchTypeOptions(searchTypes.params)
        })
    }, [])

    useEffect(() => {
        getRecipes(routeProps.match.params.query)
    }, [offset, searchType])

    const createParams = (searchParam) => {
        return `/api/v1/spoon_recipes?search=${searchParam}&offset=${offset}&sort=${searchType}`
    }

    const getRecipes = async (searchParam) => {
        const response = await fetch(createParams(searchParam))
        const responseJSON = await response.json()
        setRecipes(responseJSON.results)
        setTotalResults(responseJSON.totalResults)
    }

    const tiles = recipes.map(recipe => {
        return (
            <RecipeIndexTile key={recipe.id}
            classname="recipe-tile cell small-8"
            recipe={recipe}/>
        )
    })

    const handleSearchChange = (value) => {
        setSearchType(value)
    }

    const arrow = (event) => {
        setOffset(offset + parseInt(event.target.name) * maxPerPage)
    }


    let arrowTiles = []
    if (offset > 0) {
        arrowTiles.push(<button name="-1" onClick={arrow} key={1}>⇐</button>)
    }
    if (offset < (totalResults - maxPerPage)) {
        arrowTiles.push(<button name="1" onClick={arrow} key={2}>⇒</button>)
    }

    return (
        <div className="grid-container text-center">
            <div className="grid-x grid-padding-x grid-margin-x align-center grid-padding-y">
                <div className="cell small-12">
                    <div className="results-header">
                        <span className="search-text">Showing results {offset + 1} to {Math.min(offset + maxPerPage, totalResults)} out of {totalResults}</span>
                        <div className="search-arrows">
                            {arrowTiles}
                        </div>
                        <div className="search-text sorting">
                            <span>Sorting by: </span>
                            <DropDown options={searchTypeOptions} selected={searchType} callback={handleSearchChange}/>
                        </div>
                    </div>
                </div>
                <div className="cell small-10">
                </div>
                {tiles}
            </div>
        </div>
    )
}

export default RecipeSearchContainer