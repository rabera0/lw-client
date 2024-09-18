import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../att-logo.png';
// import '../App.css';

function Animation() {
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
    }, 2500); // Wait for 5 seconds before starting the fade

    return () => clearTimeout(timer); // Cleanup the timer
  }, [navigate, zipcode]);

  return (
    <div className={`Animation ${isFading ? 'fade-out' : ''}`}>
      <h1 className={`title ${isFading ? 'fade-out' : ''}`}>THE AT&T PERCH LIVING MURAL</h1>
      <br />
      <h2 className={`subtitle ${isFading ? 'fade-out' : ''}`}>Connecting Neighborhoods...</h2>
      <p className={`animation-text ${isFading ? 'fade-out' : ''}`}>Animation here</p>
      <br />
      <br />
      <br />
      <br />
      <br />
      <img src={logo} className={`logo ${isFading ? 'fade-out' : ''}`} alt="Logo" />
      <br />
      <br />
    </div>
);
}

export default Animation;