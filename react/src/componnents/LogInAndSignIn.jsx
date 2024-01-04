import React, { useState } from 'react'
import LogIn from './LogIn'
import SignIn from './SignIn';
import './LogInAndSignIn.css';
function LogInAndSignIn(props) {
  const [show, setShow] = useState('LogIn');
  function changeDisplay(componentToShow) {
    setShow(componentToShow);
  }
  let styleColor = show === 'SignIn' ? '#abaab6': '#ff41ea';
  let anotherStyle = show === 'SignIn' ?  '#ff41ea' : '#abaab6';
  let SignDisplay = show === 'SignIn' ? 'block' : 'none';
  let LogInDisplay = show === 'LogIn' ? 'block' : 'none';

  return (
    <>
      <div style={{ display: props.display }}>
        <div className="type">
          <span className="selected" style={{ color: styleColor }} onClick={()=>changeDisplay('LogIn')}>LogIn</span>
          <span className="space" >|</span>
          <span className="" style={{ color: anotherStyle }} onClick={()=>changeDisplay('SignIn')}>SignIn</span>
        </div>
        <LogIn display={LogInDisplay}  onChangeDisplay={changeDisplay}/>
        <SignIn display={SignDisplay}  onChangeDisplay={changeDisplay}/>
      </div>
    </>
  );
}
export default LogInAndSignIn;