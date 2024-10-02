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

    // Start fading out the image after 2 seconds
    const fadeOutTimer = setTimeout(() => {
      setIsFading(true); // Start fading out the image
      setTimeout(() => {
        setShowGraph(true); // Show the Graph after the image has fully faded out
      }, 1000); // Wait for the fade-out duration (1 second)
    }, 2000); // Wait for 2 seconds before starting to fade

    // Optional navigation after showing the graph for a while (if needed)
    const navigationTimer = setTimeout(() => {
      navigate('/atlanta', { state: { zipcode } });
    }, 6000); // Adjust as needed; this assumes the graph is shown for 3 seconds

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(navigationTimer); // Cleanup the timers
    };
  }, [navigate, zipcode]);

  return (
    <div>
      <Header />
      <div className={`AtlMap`} style={{ opacity, transition: 'opacity 1s ease-in-out' }}>
        <h2>Connecting Neighborhoods...</h2>
        <br />
        <br />
        <br />
        <div
          style={{
            width: '100%',
            maxWidth: '500px',
            margin: '0 auto',
            backgroundImage: `url(${img})`, // Set background image
            backgroundSize: 'contain', // Ensure the image is fully contained
            backgroundRepeat: 'no-repeat', // Prevent the image from repeating
            backgroundPosition: 'center', // Center the image
            height: '350px', // Set height to match inner container
            position: 'relative', // To position children absolutely within
            opacity: isFading ? 0 : 1, // Control opacity based on fading state
            transition: 'opacity 1s ease-in-out',
          }}
        ></div>
        {showGraph && <Graph zipcode={zipcode} />} {/* Render Graph only after fade-out */}
      </div>
      <Footer />
    </div>
  );
}

export default AtlMap;
