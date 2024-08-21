import React from 'react';
import { useLocation } from 'react-router-dom';
import uszips from '../data/USCities.json';
import logo from '../att-logo.png';
//import { Link } from 'react-router-dom';
// import '../App.css';

function findCityByZip(zipCode) {
  const numericZipCode = Number(zipCode);
  const result = uszips.find(entry => entry.zip_code === numericZipCode);
  return result ? result.city : 'ZIP code not found';
}

function Atlanta({ zip }) { 
  const location = useLocation();
  const zipcode = location.state?.zipcode;
  
  const city = zipcode ? findCityByZip(zipcode) : 'ZIP code not provided';

    return (
      <div className="Atlanta">
        <iframe src="https://readymag.website/u170488020/4927140/?link_target=parent"></iframe>
      </div>
      
    );
  }
  
  export default Atlanta;

