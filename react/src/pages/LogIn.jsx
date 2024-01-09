import React, { useState ,useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './pages.css';
import { usersContext } from '../App';
function LogIn({setUserData,setShowHeaders}) {
  const [userName, setuserName] = useState('');
  const [password, setPassword] = useState('');
  const users=useContext(usersContext);
  const navigate = useNavigate(); 
  let foundUser;

  function logIn(event) {
    event.preventDefault(); 

    if (userName === '' || password === '') {
      alert('Please enter both userName and password');
      return;
    }

     foundUser = users.find(user => user.username === userName);
    if (!foundUser) {
        const userDecision = confirm(
          'Your details are not saved in the system. Do you want to register with us?'
        );
        if (userDecision) {
            navigate('/register'); 
        } else {
            return;
        }
    } else {
      if (foundUser.website === password) {
        alert(`${foundUser.username} שמחים שחזרת `);
        setShowHeaders(true);
        setUserData(foundUser),
        navigate('/home'); 
      } else {
        alert('Your password is incorrect');
        setPassword("");
      }
    }
  }

  return (
    <>
    <br/>
    <br/>
      <form className="log_in">
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