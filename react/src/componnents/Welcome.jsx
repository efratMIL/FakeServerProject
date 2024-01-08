import React, { useState } from 'react'
import { NavLink,Link } from 'react-router-dom';
import './componnents.css';

function Welcome() {

  return (
    <>
      <div>
         <h1 className='activeStyles'>Welcome to your solo social!</h1>
      </div>
    </>
  );
}
export default Welcome;