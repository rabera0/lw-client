import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../att-logo.png';
// import '../App.css';

function Animation() {
  const navigate = useNavigate();

  useEffect(() => {
    // Set a timer to redirect after 5 seconds (5000 milliseconds)
    const timer = setTimeout(() => {
      navigate('/Atlanta');
    }, 5000);

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="Animation">
      <h1>THE AT&T PERCH LIVING MURAL</h1>
      <br />
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
