import React, { useState } from 'react'
import { NavLink,Link } from 'react-router-dom';
import './LogInAndSignIn.css';

function LogInAndSignIn() {
  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#ff41ea",
    margin: "auto",
    overflow: "auto",
}
  return (
    <>
      <div>
        <div className="type">
         <h1 style={activeStyles}>Welcome to your solo social!</h1>
        </div>
      
      </div>
    </>
  );
}
export default LogInAndSignIn;