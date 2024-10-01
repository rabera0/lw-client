import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';


function International() {
  const navigate = useNavigate();
  const location = useLocation();
  const zipcode = location.state?.zipcode; // Get the zipcode from the state
  const [isFading, setIsFading] = useState(false);
  const [opacity, setOpacity] = useState(0); // State for fade-in

  
  useEffect(() => {
    const fadeInTimer = setTimeout(() => {
      setOpacity(1); // Set opacity to 1 after a delay to trigger fade-in
    }, 100); // Delay before starting fade in

    const timer = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        navigate('/finalpage');
      }, 3000); // Duration of fade-out effect
    }, 3500); // Wait for 3.5 seconds before starting the fade

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(timer);
    };
  }, [navigate]);
    return (
      <div>
        <Header />
        <div className="International" style={{ opacity, transition: 'opacity 1s ease-in-out' }}>
         <br />
          <p>Hello, Global Travelers! From across the seas and lands, welcome to Georgia’s heart. We’re thrilled to share this moment with you.</p>
          <br />
          <br />
          <p>Watch the mural to see your impact</p>
          <br />
          <h6>#attatlperch</h6>
          <br></br> 
        </div> 
        <Footer /> 
      </div>
    );
  }
  
  export default International;