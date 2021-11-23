import React from "react"
import { Link } from "react-router-dom"

const NavBar = (props) => {
    const { currentUser } = props
    let userData
    if (currentUser) {
        userData = (
        <div>
            <Link to="/sign_up">Sign Up</Link>
            <Link to="/users/sign_in">Sign In</Link>
        </div>
        )
    } else {
        userData = (
        <div>
            <Link to="/users/sign_out">Sign Out</Link>
        </div>
        )
    }
    return (
        <div className="Navbar">
            <div className="Navbar-pages">
                <Link to="/recipes">Recipes</Link>
            </div>
            <Link to="/">HOME</Link>
            <div className="Navbar-user">
                {userData}
            </div>
        </div>
    )
}

export default NavBar