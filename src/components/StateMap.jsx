import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import uszips from '../data/USCities.json';
import '../index.css';
import GraphState from './GraphState'; // Import the Graph component
import TextComponent from "./Lookup";
import Usmap from "./Usmap";
import Footer from './Footer';
import Header from './Header';

//const img = "https://cdn.glitch.global/f45e1b7b-5bbc-4ef0-82cf-33f60ccdb1c4/usOutline.png?v=1727804021010";

  // Find state by ZIP code with loose matching
  function findStateByZip(zipCode) {
    const numericZipCode = Number(zipCode);
    const zipString = numericZipCode.toString();
    // console.log("Searching for state by ZIP:", zipString);

    // Try to find an exact match first
    const exactMatch = uszips.find(entry => entry.zip_code.toString() === zipString);
    if (exactMatch) {
      // console.log("Exact match found:", exactMatch.state);
      return exactMatch.state;
    }

    // If no exact match, try finding a match by the first three digits AND same number of digits
    const zipPrefix = zipString.slice(0, 3);
    const zipLength = zipString.length;

    console.log(`Looking for ZIPs starting with ${zipPrefix} and length ${zipLength}`);

    const closestMatch = uszips.find(entry => {
      const entryZipString = entry.zip_code.toString();
      return entryZipString.startsWith(zipPrefix) && entryZipString.length === zipLength;
    });

    console.log(closestMatch ? `Loose match found: ${closestMatch.state}` : "No match found");
    return closestMatch ? closestMatch.state : 'ZIP code not found';
  }

function StateMap() {
  const navigate = useNavigate();
  const location = useLocation();
  const zipcode = location.state?.zipcode;
  const [currentComponent, setCurrentComponent] = useState('text'); // Track current component
  const [opacity, setOpacity] = useState(0); // State for fade-in

  const state = zipcode ? findStateByZip(zipcode) : 'ZIP code not provided';

  useEffect(() => {
    const fadeInDuration = 200; // Initial fade-in delay
    const textDisplayDuration = 5000; // Text display duration
    const imageDisplayDuration = 3500; // Image display duration
    const graphDisplayDuration = 8500; // Graph display duration
    const fadeOutDuration = 1000; // Fade-out duration

    const timers = [];

    // Fade in for TextComponent
    const fadeInTimer = setTimeout(() => {
      setOpacity(1); // Fade in
    }, fadeInDuration);
    timers.push(fadeInTimer);

    // Display TextComponent
    const textDisplayTimer = setTimeout(() => {
      setOpacity(0); // Start fading out text
      const hideTextTimer = setTimeout(() => {
        setCurrentComponent('image'); // Switch to image
        setOpacity(1); // Fade in image
      }, fadeOutDuration);
      timers.push(hideTextTimer);
    }, textDisplayDuration + fadeInDuration);
    
    // Display Image
    const imageDisplayTimer = setTimeout(() => {
      setOpacity(0); // Start fading out image
      const hideImageTimer = setTimeout(() => {
        setCurrentComponent('graph'); // Switch to graph
        setOpacity(1); // Fade in graph
      }, fadeOutDuration);
      timers.push(hideImageTimer);
    }, textDisplayDuration + imageDisplayDuration + fadeOutDuration + fadeInDuration);
    
    // Display Graph
    const graphDisplayTimer = setTimeout(() => {
      setOpacity(0); // Start fading out graph
      const hideGraphTimer = setTimeout(() => {
        setCurrentComponent('end'); // End state
      }, fadeOutDuration);
      timers.push(hideGraphTimer);
    }, textDisplayDuration + imageDisplayDuration + graphDisplayDuration + fadeOutDuration + 2 * fadeInDuration);

    // Navigation timer
    const navigationTimer = setTimeout(() => {
      navigate('/state', { state: { zipcode } });
    }, textDisplayDuration + imageDisplayDuration + graphDisplayDuration + 3 * fadeOutDuration + 3 * fadeInDuration);

    return () => {
      timers.forEach(clearTimeout); // Cleanup all timers
    };
  }, [navigate, zipcode]);

  return (
    <div>
      <Header />
      <div style={{ textAlign: 'center', padding: '10%' }}>
        <p style={{ whiteSpace: 'pre' }}>From                To</p>
        <h5>{state} → ATL</h5>
        <br />
        
        {/* Display the Text Component */}
        {currentComponent === 'text' && (
          <div style={{ opacity, transition: 'opacity 1s ease-in-out' }}>
            <TextComponent />
          </div>
        )}
        
        {/* Image Container */}
        {currentComponent === 'image' && (
        <div style={{ position: 'relative', height: '350px', width: '100%', maxWidth: '500px', margin: '-10px auto' }}>
          <div style={{ opacity, transition: 'opacity 1s ease-in-out' }}>
            <Usmap highlightedState={state} />
          </div>
        </div>
        )}

        {/* Graph Container */}
        {currentComponent === 'graph' && (
          <div style={{ position: 'relative', top: 0, left: 0, width: '100%', height: '350px', padding: '0px 5%' }}>
            <div style={{ opacity, transition: 'opacity 1s ease-in-out' }}>
              <GraphState zipcode={zipcode} />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default StateMap;