import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Graph from './Graph'; // Import the Graph component
import Footer from './Footer';
import Header from './Header';

const img = "https://cdn.glitch.global/f45e1b7b-5bbc-4ef0-82cf-33f60ccdb1c4/atlOutline.png?v=1727804041668"

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

    // Show the graph after the image has fully faded out
    const fadeOutTimer = setTimeout(() => {
      setIsFading(true); // Start fading out the image
      setTimeout(() => {
        setShowGraph(true); // Show the Graph after the image has fully faded out
      }, 1000); // Wait for the fade-out duration (1 second)
    }, 2200); // Wait for 2 seconds of display plus 0.2 seconds of fade-in

    // Show the graph for a total of 7.5 seconds
    const navigationTimer = setTimeout(() => {
      navigate('/atlanta', { state: { zipcode } });
    }, 9500); // Total time: 3.2 seconds (image display and fade) + 7.5 seconds (graph display)

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(navigationTimer); // Cleanup the timers
    };
  }, [navigate, zipcode]);

  return (
    <div>
      <Header />
      <div className={`AtlMap`} style={{ textAlign: 'center', marginTop: '20px' }}>
        <h2>Connecting Neighborhoods...</h2>
        <div style={{ position: 'relative', height: '350px', overflow: 'hidden', margin: '0 auto', maxWidth: '500px' }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '350px',
              backgroundImage: `url(${img})`, // Set background image
              backgroundSize: 'contain', // Ensure the image is fully contained
              backgroundRepeat: 'no-repeat', // Prevent the image from repeating
              backgroundPosition: 'center', // Center the image
              opacity: isFading ? 0 : 1, // Control opacity based on fading state
              transition: 'opacity 1s ease-in-out',
            }}
          ></div>
          {showGraph && (
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '350px' }}>
              <Graph zipcode={zipcode} /> {/* Render Graph only after fade-out */}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AtlMap;
