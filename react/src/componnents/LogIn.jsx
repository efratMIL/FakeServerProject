import React, { useState } from 'react';
import './componnents.css';

function LogIn(props) {
  const [userName, setuserName] = useState('');
  const [password, setPassword] = useState('');
  function logIn(event) {
    event.preventDefault(); // Prevent form submission
    // Perform validation checks
    if (userName === '' || password === '') {
      alert('Please enter both userName and password');
      return;
    }

    let userNow = JSON.parse(localStorage.getItem(userName));
    if (!userNow) {
        const userDecision = confirm(
          'Your details are not saved in the system. Do you want to register with us?'
        );
        if (userDecision) {
            props.onChangeDisplay('SignIn'); 
        } else {
            return;
        }
    } else {
      if (userNow.password === password) {
        alert(`${userNow.userName} שמחים שחזרת `);
      } else {
        alert('Your password is incorrect');
      }
    }
  }

  return (
    <>
      <form className="log_in" style={{display: props.display}}>
        <br />
        <input
          className="userName1 inputs"
          type="userName"
          placeholder="userName"
          required
          value={userName}
          onChange={(e) => setuserName(e.target.value)}
        />
        <br />
        <br />
        <input
          className="password1 inputs"
          type="password"
          placeholder="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input className="btnl" type="submit" onClick={logIn} value="Log in" />
        <br />
        <br />
       </form>
    </>
  );
}

export default LogIn;