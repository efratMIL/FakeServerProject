import React, { useContext } from 'react';
import './pages.css';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../App';

function Home() {
    const UserData = useContext(UserContext);

    return (
        <>
            <header>
                <NavLink
                    to="/home/logout"
                    className={({ isActive }) => (isActive ? 'activeStyles' : 'unActiveStyle')}
                >
                    Log Out
                </NavLink>
                <NavLink
                    to="/home/albums"
                    className={({ isActive }) => (isActive ? 'activeStyles' : 'unActiveStyle')}
                >
                    Albums
                </NavLink>
                <NavLink
                    to="/home/posts"
                    className={({ isActive }) => (isActive ? 'activeStyles' : 'unActiveStyle')}
                >
                    Posts
                </NavLink>
                <NavLink
                    to="/home/todos"
                    className={({ isActive }) => (isActive ? 'activeStyles' : 'unActiveStyle')}
                >
                    Todos
                </NavLink>
                <NavLink
                    to="/home/info"
                    className={({ isActive }) => (isActive ? 'activeStyles' : 'unActiveStyle')}
                >
                    Info
                </NavLink>
            </header>
            <h1>Welcome {UserData.userName}</h1>
        </>
    );
}

export default Home;
