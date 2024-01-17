import React, { useContext, useState } from 'react';
import './pages.css';
import { userContext } from '../App';
import Info from './Info';

function Home() {
    const userData = useContext(userContext);
    const [isInfo, setIsInfo] = useState(false);

    return (
        <>
            <h1 className='Welcoming'>Welcome {userData.username}!</h1>
            <h2 className='Welcoming2'>To see all your details: <br /> <button className='modalButton' onClick={() => setIsInfo(!isInfo)}>press here</button></h2>
            {isInfo ? (<Info setIsInfo={setIsInfo} isInfo={isInfo} />) : ("")}
        </>
    );
}

export default Home;
