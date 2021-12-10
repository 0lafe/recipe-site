import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { BeatLoader } from "react-spinners"

const AutofillSearch = (props) => {
    const { searchParams } = props
    const [maxResults, setMaxResults] = useState(4)
    const [tiles, setTiles] = useState(
    <div className="search-fill search-spinner">
        <BeatLoader />
    </div>)
    const [delay, setDelay] = useState(null)

    const toggle = (searchParams.length > 0)

    useEffect(() => {
        setTiles(
            <div className="search-fill search-spinner">
                <BeatLoader />
            </div>)
        if (delay) {
            clearTimeout(delay)
        }
        if (toggle) {
            setDelay(setTimeout(() => {
                getSearch()
            }, 1000))
        }
    }, [searchParams])

    const createParams = () => {
        return `/api/v1/spoon_recipes?search=${searchParams}&number=${maxResults}`
    }

    const getSearch = async () => {
        const response = await fetch(createParams())
        const responseJson = await response.json()

        console.log(responseJson)

        debugger

        setTiles(responseJson.results.map((recipe) => {
            return (
                <Link to={`/recipes/${recipe.id}`} key={recipe.id}>{recipe.title}</Link>
            )
        }))
    }

    console.log(tiles)

    return (
            <div className="cell small-4 search-fill-results">
                { toggle && tiles }
            </div>
    )
}

export default AutofillSearch