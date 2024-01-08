import React, { useState } from "react"
import { Link, NavLink,Outlet } from "react-router-dom"
import "./componnents.css"
export default function Header() {
    const [showHeader, setShowHeader] = useState(false);
    <Outlet context={setShowHeader}/>

    return (
        <header>
            {!showHeader ? (
                <>
                    <NavLink className={({ isActive }) => isActive ? 'activeStyles' : 'unActiveStyle'} to="/">#Solo-Social</NavLink>
                    <NavLink
                        to="/login"
                        end
                        className={({ isActive }) => isActive ? 'activeStyles' : 'unActiveStyle'}
                    >
                        logIn
                    </NavLink>
                    <NavLink
                        to="/register"
                        className={({ isActive }) => isActive ? 'activeStyles' : 'unActiveStyle'}
                    >
                        signIn
                    </NavLink>
                </>
            )
                :
                (
                    <>
                        <NavLink className={({ isActive }) => isActive ? 'activeStyles' : 'unActiveStyle'} to="/">#Solo-Social</NavLink>

                        <NavLink
                            to="/home"
                            className={({ isActive }) => isActive ? 'activeStyles' : 'unActiveStyle'}
                        >
                            Home
                        </NavLink>
                    </>
                )}
        </header>
    )
}