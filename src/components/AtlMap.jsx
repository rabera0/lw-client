import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Graph from './Graph'; // Import the Graph component
import Footer from './Footer';
import Header from './Header';

const img = "https://cdn.glitch.global/f45e1b7b-5bbc-4ef0-82cf-33f60ccdb1c4/map3.png?v=1727867647887";

function AtlMap() {
  const navigate = useNavigate();
  const location = useLocation();
  const zipcode = location.state?.zipcode; // Get the zipcode from the state
  const [isFading, setIsFading] = useState(false);
  const [showGraph, setShowGraph] = useState(false); // State to control Graph visibility
  const [opacity, setOpacity] = useState(0); // State for fade-in

  useEffect(() => {
    // Fade in effect
    const fadeInTimer = setTimeout(() => {
      setOpacity(1);
    }, 200); // Delay before starting fade in

    const showGraphTimer = setTimeout(() => {
      setIsFading(true); // Start fading out the image
      setTimeout(() => {
        setShowGraph(true); // Show the Graph after the image has fully faded out
      }, 1000); // Wait for the fade-out duration (1 second)
    }, 2200); // Wait for 2 seconds of display plus 0.2 seconds of fade-in

    // Navigation timer
    const navigationTimer = setTimeout(() => {
      navigate('/atlanta', { state: { zipcode } });
    }, 9500); // Total time: 3.2 seconds (image display and fade) + 7.5 seconds (graph display)

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(showGraphTimer);
      clearTimeout(navigationTimer); // Cleanup the timers
    };
  }, [navigate, zipcode]);

  return (
    <div>
      <Header />
      <div style={{ textAlign: 'center', padding: '0 10%' }}>
        <h2>Connecting Neighborhoods...</h2>
        <br />
        <br />
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
              <Graph zipcode={zipcode} />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AtlMap;
