import React, { useState, useContext ,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './pages.css';
import { serverRequests } from '../Api';
import { userContext } from '../App';


function LogIn({ userData,setUserData, setShowHeaders }) {
  const [userName, setuserName] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  // function checkEndOfRegistration() {
  //   const lsUser = localStorage.getItem("thisUser")
  //   console.log(userData)
  //   if (
  //     !userData.name ||
  //     !userData.email ||
  //     !userData.phone
  //   ) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

  function logIn(event) {
    event.preventDefault();
    if (userName === '' || password === '') {
      alert('Please enter both userName and password');
      return;
    }

    (serverRequests('GET', `users?username=${userName}`, null))
      .then((foundUser) => {
        if (foundUser.length === 0) {
          const userDecision = confirm(
            'Your details are not saved in the system. Do you want to register with us?'
          );
          if (userDecision) {
            navigate('/register');
          } else {
            return;
          }
        } else {
          if (foundUser[0].website === password) {
            setUserData(foundUser[0])
            const { website, ...userDataWithoutWebsite } =foundUser[0];
            localStorage.setItem('thisUser', JSON.stringify(userDataWithoutWebsite))
            // if (checkEndOfRegistration()) {
              alert(`${foundUser[0].username} we're glad you're back`);
              setShowHeaders(true)
              navigate('/home')
            }
            // else{
            //   const userDecision = confirm(
            //     'Please fill in all fields before login.'
            //   );
            //   if (userDecision) {
            //     navigate('/endOfRegistration');
            //   } else {
            //     return;
            //   }
            // }
         // } 
          else {
            alert('Your password is incorrect');
            setPassword("");
          }
        }
      })

  }
  // async function logIn(event) {
  //   event.preventDefault();
  //   if (userName === '' || password === '') {
  //     alert('Please enter both userName and password');
  //     return;
  //   }

  //   try {
  //     const foundUser = await serverRequests('GET', `users?username=${userName}`, null);

  //     if (foundUser.length === 0) {
  //       const userDecision = confirm(
  //         'Your details are not saved in the system. Do you want to register with us?'
  //       );
  //       if (userDecision) {
  //         navigate('/register');
  //       } else {
  //         return;
  //       }
  //     } else {
  //       if (foundUser[0].website === password) {
  //         setUserData(foundUser[0]);
  //         const { website, ...userDataWithoutWebsite } = foundUser[0];
  //         localStorage.setItem('thisUser', JSON.stringify(userDataWithoutWebsite));
  //         if (checkEndOfRegistration()) {
  //           alert(`${userData.username} we're glad you're back`);
  //           setShowHeaders(true);
  //           navigate('/home');
  //         } else {
  //           const userDecision = confirm('Please fill in all fields before login.');
  //           if (userDecision) {
  //             navigate('/endOfRegistration');
  //           } else {
  //             return;
  //           }
  //         }
        
  //       } else {
  //         alert('Your password is incorrect');
  //         setPassword('');
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error fetching user data:', error);
  //   }
  // }

  // useEffect(() => {
  //   console.log('userData updated:', userData);
  //   // You can perform actions based on the updated userData here
  //   {
      
  // }, []);

  return (
    <>
      <br />
      <br />
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