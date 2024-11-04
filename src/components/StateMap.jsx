import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import uszips from '../data/USCities.json';
import '../index.css';
import GraphState from './GraphState'; // Import the Graph component
import Footer from './Footer';
import Header from './Header';

const img = "https://cdn.glitch.global/f45e1b7b-5bbc-4ef0-82cf-33f60ccdb1c4/usOutline.png?v=1727804021010";

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
  const [showGraph, setShowGraph] = useState(false); // State to control Graph visibility
  const [opacity, setOpacity] = useState(0); // State for fade-in

  const state = zipcode ? findStateByZip(zipcode) : 'ZIP code not provided';

  useEffect(() => {
    const fadeInTimer = setTimeout(() => {
      setOpacity(1); // Set opacity to 1 after a delay to trigger fade-in
    }, 200); // Delay before starting fade in

    const showGraphTimer = setTimeout(() => {
      setIsFading(true); // Start fading out the image
      setTimeout(() => {
        setShowGraph(true); // Show the Graph after the image has fully faded out
      }, 1000); // Wait for the fade-out duration (1 second)
    }, 22000); // Total time for image display before fading out

    // Navigation timer
    const navigationTimer = setTimeout(() => {
      navigate('/state', { state: { zipcode } }); // Navigate to the state route
    }, 95000); // Total time: 5.5 seconds (graph display) + 3 seconds (image display and fade)

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(showGraphTimer);
      clearTimeout(navigationTimer); // Cleanup the timers
    };
  }, [navigate, zipcode]);

  return (
    <div>
      <Header />
      <div style={{ textAlign: 'center', marginTop: '20px', padding: '0 10%' }}>
        <p>From To</p>
        <h5>ATL → {state}</h5>
        <br />
        {/* Image Container */}
        <div style={{ position: 'relative', height: '350px', width: '100%', maxWidth: '500px', margin: '0 auto' }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '350px',
              backgroundImage: `url(${img})`, // Set background image
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              opacity: isFading ? 0 : opacity,
              transition: 'opacity 1s ease-in-out',
            }}
          ></div>
          {/* Graph Container */}
          {showGraph && (
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '350px' }}>
              <GraphState zipcode={zipcode} />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default StateMap;
