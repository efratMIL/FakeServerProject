import './pages.css';
import React,{useState,useContext} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { userContext } from '../App';
Modal.setAppElement(document.body);

function Info({setIsInfo,isInfo}) {
  const userData = useContext(userContext);
  

  function openModal() {
    setIsInfo(true);
  }
  function closeModal() {
    setIsInfo(false);
  }

  return (
    <div>
      <Modal
        isOpen={isInfo}
        onRequestClose={closeModal}
        className='customStyles'
      >
        <form >
        <div >
        <span className="close" onClick={closeModal}>&times;</span>
          <h3>Personal Details:</h3>
          <br />
          <label>Name:{userData.name}</label>
          <br />
          <label>Email:{userData.email}</label>
          <br />
          <label>Phone:{userData.phone}</label>
          <br />

        </div>
        <div >
          <h3>Address:</h3>
          <label>Street:{userData.address.street}</label>
          <br />
          <label>Suite:{userData.address.suite}</label>
          <br />
          <label>City:{userData.address.city}</label>
          <br />
          <label>Zip Code:{userData.address.zipcode}</label>
          <br />
          <h3>Geo:</h3>
          <label>lat:{userData.address.geo.lat }</label>
          <br />
          <label>lng:{userData.address.geo.lng }</label>
        </div>
        <div >
          <h3>Company:</h3>
          <label>Company Name:{userData.company.name }</label>
          <br />
          <label>Catch Phrase:{userData.company.catchPhrase }</label>
          <br />
          <label>bs:{userData.company.bs }</label>
        </div>
      </form>
  
      </Modal>
    </div>
  );
}

export default Info;

