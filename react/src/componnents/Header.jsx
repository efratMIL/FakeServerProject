import React from "react"
import { Link, NavLink } from "react-router-dom"
import "./LogInAndSignIn.css"
export default function Header() {
   
    return (
        <header>
            <Link className="site-logo" to="/">#Solo-Social</Link>
            <header>
              <NavLink 
                    to="/login"
                    end
                    className={({isActive}) => isActive ? 'activeStyles' : 'unActiveStyle'}
                >
                    logIn
                </NavLink>
                <NavLink 
                    to="/register"
                    className={({isActive}) => isActive ? 'activeStyles' : 'unActiveStyle'}
                >
                    signIn
                </NavLink>
                </header>
           
        </header>
    )
}