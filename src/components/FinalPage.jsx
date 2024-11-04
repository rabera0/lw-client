import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

function FinalPage() {
    const navigate = useNavigate();
    const [opacity, setOpacity] = useState(0); // State for fade-in

    useEffect(() => {
        // Fade in effect
        const fadeInTimer = setTimeout(() => {
            setOpacity(1);
        }, 100); // Delay before starting fade in

        const timer = setTimeout(() => {
            navigate('/'); // Navigate to /Landing after the timeout
        }, 5000); // Adjust the timeout duration 

        return () => {
            clearTimeout(fadeInTimer);
            clearTimeout(timer); // Cleanup the timer on component unmount
        };
    }, [navigate]);

    return (
        <div>
          <Header />
           <br />
           <br />
           <div  className="FinalPage" style={{ opacity, transition: 'opacity 1s ease-in-out' }}>
              <div className="FinalText">
                  <h4> Connecting </h4>
                  <h3> Changes</h3>
                  <h4> Everything™ </h4>
              </div>
          </div>
          <Footer />
        </div>
    );
}

export default FinalPage;
