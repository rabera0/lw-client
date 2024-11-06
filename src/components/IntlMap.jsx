import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import TextComponent from "./Lookup"; // Your text component
import earth from '../assets/earth.gif'; // The earth image

function IntlMap() {
  const navigate = useNavigate();
  const location = useLocation();
  const zipcode = location.state?.zipcode; // Get the zipcode from the state
  const [currentComponent, setCurrentComponent] = useState('text'); // Track which component is currently displayed
  const [opacity, setOpacity] = useState(0); // State for fade-in

  useEffect(() => {
    const fadeInDuration = 200; // Initial fade-in delay
    const textDisplayDuration = 5000; // Text component display duration
    const earthDisplayDuration = 5000; // Earth component display duration
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
        setCurrentComponent('earth'); // Switch to earth component
        setOpacity(1); // Fade in earth component
      }, fadeOutDuration);
      timers.push(hideTextTimer);
    }, textDisplayDuration + fadeInDuration);

    // Timer for displaying the Earth component
    const earthDisplayTimer = setTimeout(() => {
      setOpacity(0); // Start fading out earth component
      const hideEarthTimer = setTimeout(() => {
        navigate('/International'); // Navigate after earth display
      }, fadeOutDuration);
      timers.push(hideEarthTimer);
    }, textDisplayDuration + earthDisplayDuration + 2 * fadeInDuration);

    return () => {
      timers.forEach(clearTimeout); // Cleanup all timers
    };
  }, [navigate]);

  return (
    <div>
      <Header />
      <br />
      <br />
      <div className="International" style={{ opacity, transition: 'opacity 1s ease-in-out' }}>
        {currentComponent === 'text' && (
          <TextComponent />
        )}
        {currentComponent === 'earth' && (
          <img src={earth} className="earth" alt="loading..." />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default IntlMap;