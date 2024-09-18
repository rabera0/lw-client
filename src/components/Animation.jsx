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
    }, 3000); // Wait for 5 seconds before starting the fade

    return () => clearTimeout(timer); // Cleanup the timer
  }, [navigate, zipcode]);

  return (
    <div className="Animation">
      <h1>THE AT&T PERCH LIVING MURAL</h1>
      <br />
      <h2>Connecting Neighborhoods...</h2>
      <p>Animation here</p>
      <br />
      <br />
      <br />
      <br />
      <br />
      <img src={logo} className="logo" alt="Logo" />
      <br />
      <br />
    </div>
  );
}

export default Animation;