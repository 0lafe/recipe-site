import React, { useEffect, useState } from "react"
import RecipeIndexTile from "./RecipeIndexTile"
import helperFetch from "../helpers/Fetcher"
import { BeatLoader } from "react-spinners"
import MuiSelect from "../helpers/MuiSelect"
import { Pagination } from "@mui/material"

const RecipeSearchContainer = ({ recipes, setRecipes, routeProps }) => {
    const [page, setPage] = useState(1)
    const [maxPerPage, setMaxPerPage] = useState(10)
    const [totalResults, setTotalResults] = useState(0)
    const [searchType, setSearchType] = useState("popularity")
    const [searchTypeOptions, setSearchTypeOptions] = useState([])
    const [tiles, setTiles] = useState(<div className="loader cell small-12"><BeatLoader /></div>)

    useEffect(() => {
        helperFetch('/api/v1/spoon_recipes/new').then(searchTypes => {
            setSearchTypeOptions(searchTypes.params)
        })
    }, [])

    useEffect(() => {
        getRecipes(routeProps.match.params.query)
        setTiles(<div className="loader cell small-12"><BeatLoader /></div>)
    }, [page, searchType])

    useEffect(() => {
        if (recipes.length > 0) {
            setTiles(createTiles())
        }
    }, [recipes])

    const createTiles = () => {
        return (recipes.map(recipe => {
            return (
                <RecipeIndexTile key={recipe.id}
                classname="recipe-tile cell small-8"
                recipe={recipe}/>
            )
        })
        )
    }

    const createParams = (searchParam) => {
        return `/api/v1/spoon_recipes?search=${searchParam}&offset=${maxPerPage * (page-1)}&sort=${searchType}`
    }

    const getRecipes = async (searchParam) => {
        const response = await fetch(createParams(searchParam))
        const responseJSON = await response.json()
        setRecipes(responseJSON.results)
        setTotalResults(responseJSON.totalResults)
    }

    const handleSearchChange = (value) => {
        setSearchType(value)
        setPage(1)
    }

    const changePage = (event, value) => {
        setPage(value)
    }

    return (
        <div className="grid-container text-center">
            <div className="grid-x grid-padding-x grid-margin-x align-center grid-padding-y">
                <div className="cell small-12">
                    <div className="results-header">
                        <span className="search-text">Showing results {maxPerPage * (page-1) + 1} to {Math.min(page * maxPerPage, totalResults)} out of {totalResults}</span>
                        <div className="search-text sorting">
                            <MuiSelect 
                            options={searchTypeOptions} 
                            callback={handleSearchChange} 
                            selected={searchType}/>
                        </div>
                    </div>
                </div>
                <div className="cell small-10" style={{display: 'flex', alignItems: 'center', flexDirection: 'row', width: '100%', justifyContent: 'center'}}>
                    <Pagination count={Math.ceil(totalResults/maxPerPage)} onChange={changePage} page={page}/>
                </div>
                {tiles}
            </div>
        </div>
    )
}

export default RecipeSearchContainer