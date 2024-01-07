import React from "react"
import { Link, NavLink } from "react-router-dom"

export default function Header() {
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#ff41ea",
        margin: "auto",
        overflow: "auto",
    }
    return (
        <header>
            <Link className="site-logo" to="/">#Solo-Social</Link>
            <header>
              <NavLink 
                    to="/login"
                    end
                    style={({isActive}) => isActive ? activeStyles : null}
                >
                    logIn
                </NavLink>
                <NavLink 
                    to="/register"
                    style={({isActive}) => isActive ? activeStyles : null}
                >
                    signIn
                </NavLink>
                </header>
           
        </header>
    )
}