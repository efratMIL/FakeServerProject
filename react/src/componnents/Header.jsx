import React, { useState, useContext } from "react"
import { Link, NavLink, Outlet } from "react-router-dom"
import "./componnents.css"
import { showHeadersContext } from "../App";
import logo2 from "../pictures/logo2.png";
import { userContext } from "../App";
export default function Header({ setShowHeaders }) {
    const showHeaders = useContext(showHeadersContext);
    const userData = useContext(userContext);
    console.log(userData)
    function handleLogOut() {
        localStorage.setItem('thisUser', null);
        setShowHeaders(false);
    }
    return (
        <header>
            {!showHeaders ? (
                <>
                    <NavLink
                        className={({ isActive }) => isActive ? 'activeStyles' : 'unActiveStyle'}
                        to="/"
                    >
                        <img className={'logo'} src={logo2} alt="Logo" />
                    </NavLink>
                    <NavLink
                        to="/login"
                        end
                        className={({ isActive }) => isActive ? 'activeStyles' : 'unActiveStyle'}
                    >
                        LogIn
                    </NavLink>
                    <NavLink
                        to="/register"
                        className={({ isActive }) => isActive ? 'activeStyles' : 'unActiveStyle'}
                    >
                        SignIn
                    </NavLink>
                </>
            )
                :
                (
                    <>
                        <NavLink
                            className={({ isActive }) => isActive ? 'activeStyles' : 'unActiveStyle'}
                            to="/"
                        >
                            <img className={'logo'} src={logo2} alt="Logo" />
                        </NavLink>
                        <NavLink
                            to="/home"
                            className={({ isActive }) => isActive ? 'activeStyles' : 'unActiveStyle'}
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to=".."
                            className={({ isActive }) => (isActive ? 'activeStyles' : 'unActiveStyle')}
                            onClick={handleLogOut}
                        >
                            Log Out
                        </NavLink>
                        <NavLink
                            to={`users/${userData[0].id}/albums`}
                            className={({ isActive }) => (isActive ? 'activeStyles' : 'unActiveStyle')}
                        >
                            Albums
                        </NavLink>
                        <NavLink
                            to={`users/${userData[0].id}/posts`}
                            className={({ isActive }) => (isActive ? 'activeStyles' : 'unActiveStyle')}
                        >
                            Posts
                        </NavLink>
                        <NavLink
                            to={`users/${userData[0].id}/todos`}
                            className={({ isActive }) => (isActive ? 'activeStyles' : 'unActiveStyle')}
                        >
                            Todos
                        </NavLink>
                        <NavLink
                            to={`users/${userData[0].id}/info`}
                            className={({ isActive }) => (isActive ? 'activeStyles' : 'unActiveStyle')}
                        >
                            Info
                        </NavLink>
                    </>
                )}
        </header>
    )

}