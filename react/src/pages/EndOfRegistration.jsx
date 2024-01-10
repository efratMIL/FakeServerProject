import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './pages.css';
import { serverRequests } from '../Api';
import { localStorageUserContext } from '../App'

function EndOfRegistration({ setUserData, setShowHeaders }) {
  const UserData = useContext(localStorageUserContext);
  const { userName, password } = UserData
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: userName,
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: ""
      }
    },
    phone: "",
    website: password,
    company: {
      name: "",
      catchPhrase: "",
      bs: ""
    },
  });

  function endSign(e) {
    e.preventDefault();
    serverRequests('POST', 'users', formData)
      .then((savedUser) => {
        setUserData(savedUser)
        setShowHeaders(true)
        console.log(savedUser)
      });
    navigate('/home');
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData(prevFormData => {
      const properties = name.split('.');
      if (properties.length === 1) {
        return {
          ...prevFormData,
          [name]: value,
        };
      } else if (properties.length === 2) {
        const [propertyKey, propertySubKey] = properties;
        return {
          ...prevFormData,
          [propertyKey]: {
            ...prevFormData[propertyKey],
            [propertySubKey]: value,
          },
        };
      } else if (properties.length === 3) {
        const [propertyKey, propertySubKey, propertySubSubKey] = properties;
        return {
          ...prevFormData,
          [propertyKey]: {
            ...prevFormData[propertyKey],
            [propertySubKey]: {
              ...prevFormData[propertyKey][propertySubKey],
              [propertySubSubKey]: value,
            },
          },
        };
      }
      return prevFormData;
    });
  }

  return (
    <>
      <div className="loader"></div>
      <form className="endOfRegister">
        <div className='divPersonalDetails'>
          <h3>Personal Details:</h3>
          <br />
          <input
            className="name inputs"
            type="text"
            placeholder="name"
            required
            name='name'
            value={formData.name || ''}
            onChange={handleChange}
          />
          <br />
          <input
            className="email inputs"
            type="email"
            placeholder="email"
            required
            name='email'
            value={formData.email || ''}
            onChange={handleChange}
          />
          <br />
          <input
            className="phone inputs"
            type="tel"
            placeholder="phone"
            required
            name='phone'
            value={formData.phone || ''}
            onChange={handleChange}
          />
        </div>
        <div className='divAddress'>
          <h3>Address:</h3>
          <br />
          <input
            className="street inputs"
            type="text"
            placeholder="street"
            required
            name='address.street'
            value={formData.address.street || ''}
            onChange={handleChange}
          />
          <br />
          <input
            className="suite inputs"
            type="text"
            placeholder="suite"
            required
            name='address.suite'
            value={formData.address.suite || ''}
            onChange={handleChange}
          />
          <br />
          <input
            className="city inputs"
            type="text"
            placeholder="city"
            required
            name='address.city'
            value={formData.address.city || ''}
            onChange={handleChange}
          />
          <br />
          <input
            className="zipcode inputs"
            type="text"
            placeholder="zipcode"
            required
            name='address.zipcode'
            value={formData.address.zipcode || ''}
            onChange={handleChange}
          />
          <br />
          <input
            className="lat inputs"
            type="tel"
            placeholder="lat"
            required
            name='address.geo.lat'
            value={formData.address.geo.lat || ''}
            onChange={handleChange}
          />
          <br />
          <input
            className="lng inputs"
            type="number"
            placeholder="lng"
            required
            name='address.geo.lng'
            value={formData.address.geo.lng || ''}
            onChange={handleChange}
          />
        </div>
        <div className='divCompany'>
          <h3>Company:</h3>
          <br />
          <input
            className="name inputs"
            type="text"
            placeholder="companyName"
            required
            name='company.name'
            value={formData.company.name || ''}
            onChange={handleChange}
          />
          <br />
          <input
            className="catchPhrase inputs"
            type="text"
            placeholder="catchPhrase"
            required
            name='company.catchPhrase'
            value={formData.company.catchPhrase || ''}
            onChange={handleChange}
          />
          <br />
          <input
            className="bs inputs"
            type="text"
            placeholder="bs"
            required
            name='company.bs'
            value={formData.company.bs || ''}
            onChange={handleChange}
          />
          <input className="btnEndSIgn" type="submit" onClick={e => endSign(e)} value="Sign in" />
        </div>
      </form>

    </>

  )
}
export default EndOfRegistration;