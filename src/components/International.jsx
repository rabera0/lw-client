// International.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

function International() {
  const navigate = useNavigate();
  const location = useLocation();
  const zipcode = location.state?.zipcode; // Get the zipcode from the state
  const [opacity, setOpacity] = useState(0); // State for fade-in
  const [logoClicked, setLogoClicked] = useState(false); // Flag to track if logo was clicked

  useEffect(() => {
    // If the logo was clicked, we stop the navigation logic from running
    if (logoClicked) {
      console.log('Logo was clicked, skipping auto navigation.');
      return; // Skip automatic navigation if logo was clicked
    }

    // Timed fade-in effect
    const fadeInTimer = setTimeout(() => {
      setOpacity(1); // Set opacity to 1 after a delay to trigger fade-in
    }, 100); // Delay before starting fade-in

    // Timed navigation after fade-in
    const timer = setTimeout(() => {
      // After the fade-in, initiate automatic navigation
      setTimeout(() => {
        navigate('/finalpage'); // Navigate to /finalpage after the fade-out
      }, 3000); // Duration of fade-out effect
    }, 3500); // Wait for 3.5 seconds before starting the fade

    // Cleanup timers when component unmounts or effect reruns
    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(timer);
    };
  }, [navigate, logoClicked]); // Re-run effect when `logoClicked` changes

  // Function to handle logo click
  const handleLogoClick = () => {
    setLogoClicked(true); // Set flag to true when the logo is clicked
  };

  return (
    <div>
      <Header />
      <div className="International" style={{ opacity, transition: 'opacity 1s ease-in-out' }}>
        <br />
        <p>Hello, Global Travelers! From across the seas and lands, welcome to Georgia’s heart. We’re thrilled to share this moment with you.</p>
        <br />
        <p>Watch the mural to see how you connect with other fans.</p>
        <p>Tag us @ATT</p>
        <br />
      </div>
      <Footer onLogoClick={handleLogoClick} /> {/* Pass the handler to Footer */}
    </div>
  );
}

export default International;
