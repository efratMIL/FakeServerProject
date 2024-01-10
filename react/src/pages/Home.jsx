import React, { useContext } from 'react';
import './pages.css';
import { NavLink } from 'react-router-dom';
import { userContext } from '../App';

function Home() {
    const UserData = useContext(userContext);

    return (
       <>
            <h1 className='Welcoming'>Welcome {UserData.username}</h1>
            
        </>
    );
}

export default Home;
