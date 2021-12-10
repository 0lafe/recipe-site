import React, { useEffect, useState } from "react"
import RecipeIndexTile from "./RecipeIndexTile"
import helperFetch from "../helpers/Fetcher"
import DropDown from "../helpers/DropDown"
import { BeatLoader } from "react-spinners"

const RecipeSearchContainer = (props) => {
    const { recipes, setRecipes, routeProps } = props
    const [offset, setOffset] = useState(0)
    const [maxPerPage, setMaxPerPage] = useState(10)
    const [totalResults, setTotalResults] = useState(0)
    const [searchType, setSearchType] = useState("popularity")
    const [searchTypeOptions, setSearchTypeOptions] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [tiles, setTiles] = useState(<div className="loader cell small-12"><BeatLoader /></div>)

    useEffect(() => {
        helperFetch('/api/v1/spoon_recipes/new').then(searchTypes => {
            setSearchTypeOptions(searchTypes.params)
        })
    }, [])

    useEffect(() => {
        getRecipes(routeProps.match.params.query)
        setTiles(<div className="loader cell small-12"><BeatLoader /></div>)
    }, [offset, searchType])

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
        return `/api/v1/spoon_recipes?search=${searchParam}&offset=${offset}&sort=${searchType}`
    }

    const getRecipes = async (searchParam) => {
        const response = await fetch(createParams(searchParam))
        const responseJSON = await response.json()
        setRecipes(responseJSON.results)
        setTotalResults(responseJSON.totalResults)
    }

    const handleSearchChange = (value) => {
        setSearchType(value)
        setOffset(0)
        setCurrentPage(1)
    }

    const arrow = (event) => {
        event.preventDefault()
        if (!(event.target.className === "disabled")) {
            setOffset(offset + parseInt(event.target.name) * maxPerPage)
            if (event.target.name === "1") {
                setCurrentPage(currentPage + 1)
            } else {
                setCurrentPage(currentPage - 1)
            }
        }
    }
    const numberSelect = (event) => {
        event.preventDefault()
        setOffset((parseInt(event.target.name) - 1) * maxPerPage)
        setCurrentPage(parseInt(event.target.name))
    }

    let disableNext = "disabled"
    let disablePrevious = "disabled"
    if (offset > 0) {
        disablePrevious = ""
    }
    if (offset < (totalResults - maxPerPage)) {
        disableNext = ""
    }
    const previousButton = <li className={`pagination-previous`} onClick={arrow}><a aria-label="Previous page" name="-1" className={`${disablePrevious}`}>Previous <span className="show-for-sr">page</span></a></li>
    const nextButton = <li className={`pagination-next`} onClick={arrow}><a aria-label="Next page" name="1" className={`${disableNext}`}>Next <span className="show-for-sr">page</span></a></li>
    const totalPages = Math.ceil(totalResults/maxPerPage)

    const maxBack = 2
    const searchOpions = 5
    const previousNums = Math.min(currentPage - 1, maxBack)

    const nums = [...Array(searchOpions)].map((_, num) => {
        if (previousNums > 0) {
            return (num - previousNums + currentPage)
        } else {
            return num + 1
        }
    })

    const pages = nums.map(num => {
        if (num <= totalPages) {
            if (currentPage === num) {
                return (
                    <li key={num} className="current"><span className="show-for-sr">You're on page</span>{num}</li>
                )
            } else {
                return (
                    <li key={num}><a aria-label={`Page ${num}`} onClick={numberSelect} name={num}>{num}</a></li>
                )
            }
        }
    })

    const pageBar = (
        <ul className="pagination text-center" role="navigation" aria-label="Pagination" data-page="6" data-total="16">
            {previousButton}
            {pages}
            {nextButton}
        </ul>
    )

    return (
        <div className="grid-container text-center">
            <div className="grid-x grid-padding-x grid-margin-x align-center grid-padding-y">
                <div className="cell small-12">
                    <div className="results-header">
                        <span className="search-text">Showing results {offset + 1} to {Math.min(offset + maxPerPage, totalResults)} out of {totalResults}</span>
                        <div className="search-text sorting">
                            <span className="sorting-text">Sorting by: </span>
                            <DropDown options={searchTypeOptions} selected={searchType} callback={handleSearchChange}/>
                        </div>
                    </div>
                </div>
                <div className="cell small-10">
                    {pageBar}
                </div>
                {tiles}
            </div>
        </div>
    )
}

export default RecipeSearchContainer