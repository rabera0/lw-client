import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Graph from './Graph'; // Import the Graph component
import Footer from './Footer';
import Header from './Header';

function AtlMap() {
  const navigate = useNavigate();
  const location = useLocation();
  const zipcode = location.state?.zipcode; // Get the zipcode from the state
  const [isFading, setIsFading] = useState(false);
  const [opacity, setOpacity] = useState(0); // State for fade-in

  useEffect(() => {
    // Fade in effect
    const fadeInTimer = setTimeout(() => {
      setOpacity(1);
    }, 100); // Delay before starting fade in

    const timer = setTimeout(() => {
      setIsFading(true); // Start fading out
      setTimeout(() => {
        navigate('/atlanta', { state: { zipcode } }); // Pass zipcode to /atlanta
      }, 3000); // Duration of fade-out effect
    }, 5500); // Wait for 5.5 seconds before starting the fade

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(timer); // Cleanup the timer
    };
  }, [navigate, zipcode]);

  return (
    <div className={`AtlMap`} style={{ opacity, transition: 'opacity 1s ease-in-out' }}>
      <h1 className={`title`}>THE AT&T PERCH LIVING MURAL</h1>
      <br />
      <h2 className={`subtitle ${isFading ? 'fade-out' : ''}`}>Connecting Neighborhoods...</h2>
      <Graph zipcode={zipcode} />
      <Footer />
      <br />
      <br />
    </div>
  );
}

export default AtlMap;
