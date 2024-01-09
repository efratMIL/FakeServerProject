import React, { useState } from "react"
import { Link, NavLink, Outlet } from "react-router-dom"
import "./componnents.css"
export default function Header() {
    const [showHeader, setShowHeader] = useState(false);
    <Outlet context={setShowHeader} />

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
                        <NavLink
                            to=".."
                            className={({ isActive }) => (isActive ? 'activeStyles' : 'unActiveStyle')}
                            onClick={() => { { localStorage.setItem('thisUser', null) } }}
                        >
                            Log Out
                        </NavLink>
                        <NavLink
                            to="/albums"
                            className={({ isActive }) => (isActive ? 'activeStyles' : 'unActiveStyle')}
                        >
                            Albums
                        </NavLink>
                        <NavLink
                            to="/posts"
                            className={({ isActive }) => (isActive ? 'activeStyles' : 'unActiveStyle')}
                        >
                            Posts
                        </NavLink>
                        <NavLink
                            to="/todos"
                            className={({ isActive }) => (isActive ? 'activeStyles' : 'unActiveStyle')}
                        >
                            Todos
                        </NavLink>
                        <NavLink
                            to="/info"
                            className={({ isActive }) => (isActive ? 'activeStyles' : 'unActiveStyle')}
                        >
                            Info
                        </NavLink>
            
                )
                        
                        
                </header>
            )
          
}