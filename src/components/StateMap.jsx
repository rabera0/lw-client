import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import uszips from '../data/USCities.json';
import logo from '../att-logo.png';
import '../index.css';
import Graph from './Graph'; // Import the Graph component
import Footer from './Footer';
import Header from './Header';

const stateDirection = {
  "Indiana": "N",
  "Kentucky": "N",
  "Michigan": "N",
  "Minnesota": "N",
  "Ohio": "N",
  "Tennessee": "N",
  "Wisconsin": "N",
  "Iowa": "N",
  "Connecticut": "NE",
  "Delaware": "NE",
  "Georgia": "NE",
  "Maryland": "NE",
  "Maine": "NE",
  "Massachusetts": "NE",
  "New Hampshire": "NE",
  "New Jersey": "NE",
  "New York": "NE",
  "North Carolina": "NE",
  "Pennsylvania": "NE",
  "Rhode Island": "NE",
  "Vermont": "NE",
  "Virginia": "NE",
  "West Virginia": "NE",
  "South Carolina": "E",
  "Florida": "SE",
  "Hawaii": "SW",
  "Louisiana": "SW",
  "New Mexico": "W",
  "Texas": "W",
  "Alabama": "W",
  "Arizona": "W",
  "Arkansas": "W",
  "California": "W",
  "Colorado": "NW",
  "Mississippi": "W",
  "Nebraska": "NW",
  "Oklahoma": "NW",
  "Kansas": "NW",
  "Utah": "NW",
  "Wyoming": "NW",
  "Alaska": "NW",
  "Idaho": "NW",
  "Illinois": "NW",
  "Missouri": "NW",
  "Montana": "NW",
  "Nevada": "NW",
  "North Dakota": "NW",
  "Oregon": "NW",
  "South Dakota": "NW",
  "Washington": "NW"
}

function findStateByZip(zipCode) {
  const numericZipCode = Number(zipCode);
  const result = uszips.find(entry => entry.zip_code === numericZipCode);
  return result ? result.state : 'ZIP code not found';
}

function triggerDirectionByZip(zipCode) {
  const numericZipCode = Number(zipCode);
}

function StateMap() {
  const navigate = useNavigate();
  const location = useLocation();
  const zipcode = location.state?.zipcode;
  const [isFading, setIsFading] = useState(false);
  const [opacity, setOpacity] = useState(0); // State for fade-in

  const state = zipcode ? findStateByZip(zipcode) : 'ZIP code not provided';

  useEffect(() => {
    const fadeInTimer = setTimeout(() => {
      setOpacity(1); // Set opacity to 1 after a delay to trigger fade-in
    }, 100); // Delay before starting fade in

    const timer = setTimeout(() => {
      setIsFading(true); // Start fading out
      setTimeout(() => {
        navigate('/state', { state: { zipcode } }); // Pass state to /state
      }, 3000); // Duration of fade-out effect
    }, 3500); // Wait for 3.5 seconds before starting the fade

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(timer); // Cleanup the timers
    };
  }, [navigate, zipcode]);

  return (
    <div className="StateMap" style={{ opacity, transition: 'opacity 1s ease-in-out' }}>
      <h1>THE AT&T PERCH LIVING MURAL</h1>
      <p>From     To</p>
      <h4>ATL {">>"} {state}</h4>
      <br />
      <Graph zipcode={30303} />
      <br />
      <br />
      <Footer />
      <br />
      <br />
    </div>
  );
}

export default StateMap;
