import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer'; 
import Header from './Header';

function Landing() {
  const [opacity, setOpacity] = useState(0); // State for fade-in

  useEffect(() => {
    const fadeInTimer = setTimeout(() => {
      setOpacity(1); // Set opacity to 1 after a delay to trigger fade-in
    }, 100); // Delay before starting fade in

    return () => {
      clearTimeout(fadeInTimer); // Cleanup the timer
    };
  }, []);

  return (
    <div>
      <Header />
      <div className="Landing" style={{ opacity, transition: 'opacity 1s ease-in-out' }}>
        <p>
          At AT&T, we know connecting changes everything. In service of this mindset, this artwork represents a cultural touchpoint that bridges 
          Mercedes-Benz stadium and Metropolitan Atlanta. The mural features an interactive map showing how fans from nearby neighborhoods all come 
          together and connect with each other.the updates you made to what you showed us yesterday meet their requirements.
        </p>
        <br />
        <p>
          The mural is an interactive map showing different neighborhoods of Metro Atlanta.
        </p>
        <br />
        <p>*No data is collected from this installation*</p>
        <br />
        <Link to='/proceed'>
          <button>Proceed</button>
        </Link> 
        <br />
        <br />
        <br />
        <br />
      </div>
      <br />
      <Footer />
    </div>
    
  );
}

export default Landing;
