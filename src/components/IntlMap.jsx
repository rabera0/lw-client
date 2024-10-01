import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Graph from './Graph'; 
import GraphState from './GraphState'
import AFrameScene from './AFrame';

function IntlMap() {
    const navigate = useNavigate();
  const location = useLocation();
  const zipcode = location.state?.zipcode; // Get the zipcode from the state
  const [isFading, setIsFading] = useState(false);
  const [opacity, setOpacity] = useState(0); // State for fade-in

  
  useEffect(() => {
    const fadeInTimer = setTimeout(() => {
      setOpacity(1); // Set opacity to 1 after a delay to trigger fade-in
    }, 200); // Delay before starting fade in

    const timer = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        navigate('/International');
      }, 1000); // Duration of fade-out effect
    }, 5000); // Wait for 3.5 seconds before starting the fade

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(timer);
    };
  }, [navigate]);
  
    return (
      <div>
        <Header />
        <div  className="International" style={{ opacity, transition: 'opacity 3s ease-in-out' }}>
          <h2> Connecting Atlanta to the World... </h2>
          <AFrameScene />
        </div>
        <Footer />
      </div>
    );
  }
  
  export default IntlMap;