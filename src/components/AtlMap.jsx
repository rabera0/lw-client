import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../att-logo.png';
import Graph from './Graph'; // Import the Graph component
// import '../App.css';

function AtlMap() {
  const navigate = useNavigate();
  const location = useLocation();
  const zipcode = location.state?.zipcode; // Get the zipcode from the state
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFading(true); // Start fading out
      setTimeout(() => {
        navigate('/atlanta', { state: { zipcode } }); // Pass zipcode to /atlanta
      }, 1000); // Duration of fade-out effect
    }, 3500); // Wait for 3.5 seconds before starting the fade

    return () => clearTimeout(timer); // Cleanup the timer
  }, [navigate, zipcode]);

  return (
    <div className={`AtlMap`}>
      <h1 className={`title`}>THE AT&T PERCH LIVING MURAL</h1>
      <br />
      <h2 className={`subtitle ${isFading ? 'fade-out' : ''}`}>Connecting Neighborhoods...</h2>
      {/* Replace 'Animation here' with the Graph component */}
      <Graph zipcode={zipcode} />
      {/* <div className={`animation-container`}>
        <Graph />
      </div> */}
      <img src={logo} className={`logo`} alt="Logo" />
      <br />
      <br />
    </div>
  );
}

export default AtlMap;
