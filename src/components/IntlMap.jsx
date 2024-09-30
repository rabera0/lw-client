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
    }, 100); // Delay before starting fade in

    const timer = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        navigate('/International');
      }, 20500); // Duration of fade-out effect
    }, 30500); // Wait for 3.5 seconds before starting the fade

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(timer);
    };
  }, [navigate]);
  
    return (
      <div>
        <Header />
        <div  className="International" style={{ opacity, transition: 'opacity 1s ease-in-out' }}>
          <h2> Connecting Atlanta to the World... </h2>
          <br></br>
          <br></br>
          <br></br>
          <iframe height="300" style="width: 100%;" scrolling="no" title="Rotating Earth" src="https://codepen.io/HighFlyer/embed/LWqevW?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/HighFlyer/pen/LWqevW">
  Rotating Earth</a> by Thea (<a href="https://codepen.io/HighFlyer">@HighFlyer</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
          <br></br>  
          <br></br>
          <br></br>
        </div>
        <Footer />
        <br></br>
        <br></br>  
      </div>
    );
  }
  
  export default IntlMap;