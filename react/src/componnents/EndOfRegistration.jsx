import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './componnents.css';

function EndOfRegistration() {
  const { userName, password } = JSON.parse(localStorage.getItem('thisUser'))
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [suite, setSuite] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [catchPhrase, setCatchPhrase] = useState('');
  const [bs, setBs] = useState('');

  function endSign() {
    const newUser = {
      id,
      name,
      username: userName,
      email,
      address: {
        street,
        suite,
        city,
        zipcode,
        geo: {
          lat,
          lng,
        },
      },
      phone,
      website: password,
      company: {
        name: companyName,
        catchPhrase,
        bs,
      },
    };

    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then(response => {
        if (!response.ok) {
          console.error('Error:', response.statusText);
          throw new Error('Failed to create user');
        }
        navigate('/home');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

return (
  <>
    <form className="endOfRegister">
      <div className='divPersonalDetails'>
        <h3>Personal Details:</h3>
        <br />
        <input
          className="id inputs"
          type="text"
          placeholder="id"
          required
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <br />
        <input
          className="name inputs"
          type="text"
          placeholder="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          className="email inputs"
          type="email"
          placeholder="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          className="phone inputs"
          type="tel"
          placeholder="phone"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
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
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        <br />
        <input
          className="suite inputs"
          type="text"
          placeholder="suite"
          required
          value={suite}
          onChange={(e) => setSuite(e.target.value)}
        />
        <br />
        <input
          className="city inputs"
          type="text"
          placeholder="city"
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <br />
        <input
          className="zipcode inputs"
          type="text"
          placeholder="zipcode"
          required
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
        />
        <br />
        <input
          className="lat inputs"
          type="tel"
          placeholder="lat"
          required
          value={lat}
          onChange={(e) => setLat(e.target.value)}
        />
        <br />
        <input
          className="lng inputs"
          type="number"
          placeholder="lng"
          required
          value={lng}
          onChange={(e) => setLng(e.target.value)}
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
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <br />
        <input
          className="catchPhrase inputs"
          type="text"
          placeholder="catchPhrase"
          required
          value={catchPhrase}
          onChange={(e) => setCatchPhrase(e.target.value)}
        />
        <br />
        <input
          className="bs inputs"
          type="text"
          placeholder="bs"
          required
          value={bs}
          onChange={(e) => setBs(e.target.value)}
        />
      </div>
      <input className="btnEndSIgn" type="submit" onClick={endSign} value="Sign in" />
    </form>

  </>

)
}
export default EndOfRegistration;