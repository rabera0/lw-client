import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Graph from './Graph'; // Import the Graph component
import Footer from './Footer';
import Header from './Header';
import TextComponent from "./Lookup";
import atlCityMap from '../atlcitymap.png';

function AtlMap() {
  const navigate = useNavigate();
  const location = useLocation();
  const zipcode = location.state?.zipcode; // Get the zipcode from the state
  const [currentComponent, setCurrentComponent] = useState('text'); // Track which component is currently displayed
  const [opacity, setOpacity] = useState(0); // State for fade-in

  useEffect(() => {
    const fadeInDuration = 200; // Initial fade-in delay
    const textDisplayDuration = 5000; // Text component display duration
    const imageDisplayDuration = 3500; // Image component display duration
    const graphDisplayDuration = 8500; // Graph component display duration
    const fadeOutDuration = 1000; // Fade-out duration

    const timers = [];

    // Fade in effect for TextComponent
    const fadeInTimer = setTimeout(() => {
      setOpacity(1); // Fade in
    }, fadeInDuration);
    timers.push(fadeInTimer);

    // Timer for displaying the TextComponent
    const textDisplayTimer = setTimeout(() => {
      setOpacity(0); // Start fading out text
      const hideTextTimer = setTimeout(() => {
        setCurrentComponent('image'); // Switch to image
        setOpacity(1); // Fade in image
      }, fadeOutDuration);
      timers.push(hideTextTimer);
    }, textDisplayDuration + fadeInDuration);
    
    // Timer for displaying the Image
    const imageDisplayTimer = setTimeout(() => {
      setOpacity(0); // Start fading out image
      const hideImageTimer = setTimeout(() => {
        setCurrentComponent('graph'); // Switch to graph
        setOpacity(1); // Fade in graph
      }, fadeOutDuration);
      timers.push(hideImageTimer);
    }, textDisplayDuration + imageDisplayDuration + 2 * fadeInDuration);
    
    // Timer for displaying the Graph
    const graphDisplayTimer = setTimeout(() => {
      setOpacity(0); // Start fading out graph
      const hideGraphTimer = setTimeout(() => {
        setCurrentComponent('end'); // End state
      }, fadeOutDuration);
      timers.push(hideGraphTimer);
    }, textDisplayDuration + imageDisplayDuration + graphDisplayDuration + 3 * fadeInDuration);

    // Navigation timer
    const navigationTimer = setTimeout(() => {
      navigate('/atlanta', { state: { zipcode } });
    }, textDisplayDuration + imageDisplayDuration + graphDisplayDuration + 4 * fadeInDuration);

    return () => {
      timers.forEach(clearTimeout); // Cleanup all timers
    };
  }, [navigate, zipcode]);

  return (
    <div>
      <Header />
      <div style={{ textAlign: 'center', padding: '10%' }}>
        <h2>Connecting Neighborhoods...</h2>
        <br />
        
        {/* Display the Text Component */}
        {currentComponent === 'text' && (
          <div style={{ opacity, transition: 'opacity 1s ease-in-out' }}>
            <TextComponent /> {/* Replace with your actual TextComponent */}
          </div>
        )}
        
        {/* Image Container */}
        {currentComponent === 'image' && (
          <div style={{ position: 'relative', height: '350px', width: '100%', maxWidth: '500px', margin: '0 auto' }}>
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '350px',
                backgroundImage: `url(${atlCityMap})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                opacity,
                transition: 'opacity 1s ease-in-out',
              }}
            ></div>
          </div>
        )}

        {/* Graph Container */}
        {currentComponent === 'graph' && (
          <div style={{ position: 'relative', top: 0, left: 0, width: '100%', height: '350px', padding: '0px 5%' }}>
            <div style={{ opacity, transition: 'opacity 1s ease-in-out' }}>
              <Graph zipcode={zipcode} />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default AtlMap;