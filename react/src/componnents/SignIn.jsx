import React, { useState } from 'react';
import './LogInAndSignIn.css';
function SignIn(props) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
 function checkPassword(password) {
    // Check if the password is at least 8 characters long
    if (password.length < 8) {
      return false;
    }
    // Check if the password contains at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      return false;
    }
 
    // Check if the password contains at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      return false;
    }
 
    // Check if the password contains at least one number
    if (!/[0-9]/.test(password)) {
      return false;
    }
 
    // Check if the password contains at least one special character
    if (!/[@#$%^&+=!]/.test(password)) {
      return false;
    }
 
    // If all checks pass, the password is valid
    return true;
  }
 
  function checkPasswordMatch(password1, confirmPassword) {
    if (password1 !== confirmPassword) {
      return false;
    }
    return true;
  }
 
 
  function signIn(event) {
    event.preventDefault(); // Prevent form submission

    if ( password === '' || userName === '') {
      alert('Please enter both username and password');
      return;
    }

    if (!checkPassword(password)) {
      alert('The password you chose is not strong enough');
      return;
    }

    if (!checkPasswordMatch(password, confirmPassword)) {
      alert('Passwords do not match. Please try again.');
      return;
    }
    let userData = JSON.parse(localStorage.getItem(userName));
    if (userData) {
        const userDecision = confirm(
            'You already exist in the system. Do you want to log in?'
          );
      if(userDecision)
      {
        props.onChangeDisplay('LogIn'); 
    }
      else{
      return;
      } 
    } else {
      const user = {
        userName: userName,
        password: password
      };
      alert(`שמחים שהצטרפת אלינו, ${userName} 😊`);
      localStorage.setItem(userName, JSON.stringify(user));
      localStorage.setItem('thisUser', userName);
    }
  }
  return (
    <>
      <form className="sign_in" style={{display: props.display}}>
        <br />
        <input
          className="username inputs"
          type="text"
          placeholder="User name"
          required
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <br />
        <br />
        <input
         className="username inputs"
          type="password"
          placeholder="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <input
         className="username inputs"
          type="password"
          placeholder="password validation"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <br />
        <input className="takanon" type="checkbox" name="scales" required />
        <label className="takanon" htmlFor="scales">
          I agree to accept all site conditions
        </label>
        <input className="btns" type="submit" onClick={signIn} value="Sign in" />
        <br />
      </form>
    </>
  );
}

export default SignIn;