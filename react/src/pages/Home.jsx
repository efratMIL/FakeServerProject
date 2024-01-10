import React, { useContext } from 'react';
import './pages.css';
import { NavLink } from 'react-router-dom';
import { userContext } from '../App';
import Info from './Info';

function Home() {
    const userData = useContext(userContext);
   
    return (
       <>
            <h1 className='Welcoming'>Welcome {userData.username}</h1>
            {/* {/* {/*  <NavLink
                            to={`users/${userData.id}/info`}
                            className={({ isActive }) => (isActive ? 'activeStyles' : 'unActiveStyle')}
                        >press here</NavLink> */}
                        {/* <h2>To see all your details <button onClick={()=>{<Info/>}}>press here</button></h2> */ }
        </>
    );
}

export default Home;
