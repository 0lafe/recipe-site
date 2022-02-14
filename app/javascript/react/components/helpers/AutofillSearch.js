import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { BeatLoader } from "react-spinners"

const AutofillSearch = ({ searchParams, focused }) => {
    const [maxResults, setMaxResults] = useState(6)
    const [delay, setDelay] = useState(null)
    const [tiles, setTiles] = useState(
        <div className="search-fill search-spinner">
            <BeatLoader />
        </div>
    )

    const toggle = (searchParams.length > 0) && focused

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
        return `/api/v1/spoon_recipes?search=${searchParams}&number=${maxResults}&sort=popularity`
    }

    const getSearch = async () => {
        const response = await fetch(createParams())
        const responseJson = await response.json()

        setTiles(
            <div className="search-fill">
                {responseJson.results.map((recipe) => {
                    return (
                        <div className="search-results" key={recipe.id}><Link to={`/recipes/${recipe.id}`} >{recipe.title}</Link></div>
                    )
                })}
            </div>
        )
    }

    return (
            <div className="search-fill-container">
                { toggle && tiles }
            </div>
    )
}

export default AutofillSearch