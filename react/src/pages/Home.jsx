import React, { useContext, useState } from 'react';
import './pages.css';
import { NavLink ,useNavigate} from 'react-router-dom';
import { userContext } from '../App';
import Info from './Info';

function Home() {
    const userData = useContext(userContext);
    const[isInfo,setIsInfo]=useState(false);
  
    return (
       <>
            <h1 className='Welcoming'>Welcome {userData.username}</h1>
           {/* <NavLink
                            to={`users/${userData.id}/info`}
                            className={({ isActive }) => (isActive ? 'activeStyles' : 'unActiveStyle')}
                            
                        >press here</NavLink> */}
                        <h2>To see all your details  <button onClick={()=>setIsInfo(!isInfo)}>press here</button></h2>
                        {isInfo?(<Info setIsInfo={setIsInfo} isInfo={isInfo}/>):("")}
        </>   
    );
}

export default Home;
