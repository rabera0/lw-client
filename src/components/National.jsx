import React from 'react';
import { useLocation } from 'react-router-dom';
import uszips from '../data/USCities.json';
import logo from '../att-logo.png';
// import '../App.css';

function findCityByZip(zipCode) {
  const numericZipCode = Number(zipCode);
  const result = uszips.find(entry => entry.zip_code === numericZipCode);
  return result ? result.city : 'ZIP code not found';
}

function National(zip) {
  const location = useLocation();
  const zipcode = location.state?.zipcode;
  
  const city = zipcode ? findCityByZip(zipcode) : 'ZIP code not provided';

  console.log(zipcode);
    return (
      <div className="National">
        <h1>THE AT&T PERCH LIVING MURAL</h1>
        <p>From     To</p>
        <h4> ATL {">>"} {city} </h4>
        <p>Your zipcode is: {zipcode}</p> 
        <br></br>
        <br></br>
        <br></br>
        <br></br>   
        <br></br>
        <br></br>
        <img src={logo} className="logo" alt="Logo" />
        <br></br>
        <br></br>   
      </div>
    );
  }
  
  export default National;