import React from 'react';
import './componnents.css';
import { Link, NavLink } from "react-router-dom"

function Home() {
    const storedUser = JSON.parse(localStorage.getItem('thisUser'));
    const userName = storedUser ? storedUser.userName : '';
    return (
        <>
            <header>
                <NavLink
                    to="/home/logout"
                    className={({ isActive }) => isActive ? 'activeStyles' : 'unActiveStyle'}
                >
                    Log Out
                </NavLink>
                <NavLink
                    to="/home/albums"
                    className={({ isActive }) => isActive ? 'activeStyles' : 'unActiveStyle'}
                >
                    Albums
                </NavLink>
                <NavLink
                    to="/home/posts"
                    className={({ isActive }) => isActive ? 'activeStyles' : 'unActiveStyle'}
                    onClick={() => setShowHeader(true)}
                >
                    Posts
                </NavLink>
                <NavLink
                    to="/home/todos"
                    className={({ isActive }) => isActive ? 'activeStyles' : 'unActiveStyle'}
                    onClick={() => setShowHeader(true)}
                >
                    Todos
                </NavLink>
                <NavLink
                    to="/home/info"
                    className={({ isActive }) => isActive ? 'activeStyles' : 'unActiveStyle'}
                    onClick={() => setShowHeader(true)}
                >
                    Info
                </NavLink>
            </header>
            <h1>Welcome {userName}</h1>
        </>
    );
}

export default Home;
