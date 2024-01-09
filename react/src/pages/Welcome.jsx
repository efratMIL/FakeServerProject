import React, { useState } from 'react'
import { NavLink,Link } from 'react-router-dom';
import './pages.css';

function Welcome() {

  return (
    <>
      <div>
        <br/>
        <br/>
        <br/>
         <h1 className='Welcoming'>Welcome to HappyHarmonyHub!</h1>
         <h4 className='Welcoming2'>"A hub where happiness and harmony come together"</h4>
      </div>
    </>
  );
}
export default Welcome;