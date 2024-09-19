import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import uszips from '../data/USCities.json';
import logo from '../att-logo.png';
import '../index.css';
import Graph from './Graph'; // Import the Graph component


function findStateByZip(zipCode) {
  const numericZipCode = Number(zipCode);
  const result = uszips.find(entry => entry.zip_code === numericZipCode);
  return result ? result.state : 'ZIP code not found';
}

function StateMap() {
  const navigate = useNavigate();
  const location = useLocation();
  const zipcode = location.state?.zipcode;
  const [isFading, setIsFading] = useState(false);
  
  const state = zipcode ? findStateByZip(zipcode) : 'ZIP code not provided';

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFading(true); // Start fading out
      setTimeout(() => {
        navigate('/state', { state: { zipcode } }); // Pass state to /state
      }, 1000); // Duration of fade-out effect
    }, 150500); // Wait for 3.5 seconds before starting the fade

    return () => clearTimeout(timer); // Cleanup the timer
  }, [navigate, zipcode]);

  return (
    <div className="StateMap">
      <h1>THE AT&T PERCH LIVING MURAL</h1>
      <p>From     To</p>
      <h4>ATL {">>"} {state}</h4>
      <br />
      <Graph zipcode={30303} />
      <br />
      <br />
      <img src={logo} className="logo" alt="Logo" />
      <br />
      <br />
    </div>
  );
}

export default StateMap;
