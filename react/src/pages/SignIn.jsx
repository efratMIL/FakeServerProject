import React, { useState, useEffect, useContext } from 'react';
import './pages.css';
import { useNavigate } from 'react-router-dom';
import { serverRequests } from '../Api';

function SignIn({ setUserData }) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();



  function checkPasswordMatch(password1, confirmPassword) {
    if (password1 !== confirmPassword) {
      return false;
    }
    return true;
  }

  function signIn(event) {
    event.preventDefault();

    if (password === '' || userName === '') {
      alert('Please enter both username and password');
      return;
    }

    if (password.length < 8) {
      alert('The password you chose is not strong enough');
      return;
    }

    if (!checkPasswordMatch(password, confirmPassword)) {
      alert('Passwords do not match. Please try again.');
      return;
    }
    serverRequests('GET', `users?username=${userName}`, null)
      .then((isUserExist) => {

        if (isUserExist.length != 0) {
          console.log(isUserExist.length)
          const userDecision = confirm(
            'You already exist in the system. Do you want to log in?'
          );
          if (userDecision) {
            navigate('/login');
          }
          else {
            return;
          }
        } else {
          console.log(isUserExist.length)
          const currentUser = {
            username: userName,
            website: password
          };
          alert(`${userName} we are glad you joined us😊`);
          serverRequests('POST', 'users', currentUser)
            .then((savedUser) => {
              setUserData(savedUser)
              console.log(savedUser)
            })
          navigate('/end-of-registration');
        }
      })
  }




  return (
    <>
      <form className="sign_in" >
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

        <input className="btns" type="submit" onClick={signIn} value="Add others details" />
        <br />
      </form>
    </>
  );
}

export default SignIn;