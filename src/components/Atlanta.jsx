import React from 'react';
import { useLocation } from 'react-router-dom';
import uszips from '../data/USCities.json';
import logo from '../att-logo.png';
//import { Link } from 'react-router-dom';
// import '../App.css';
import { useState } from 'react';

function findCityByZip(zipCode) {
  const numericZipCode = Number(zipCode);
  const result = uszips.find(entry => entry.zip_code === numericZipCode);
  return result ? result.city : 'ZIP code not found';
}

function Atlanta() { 
  const location = useLocation();
  const zipcode = location.state?.zipcode;
  
  const city = zipcode ? findCityByZip(zipcode) : 'ZIP code not provided';

  // State to track iframe loading
  const [isLoaded, setIsLoaded] = useState(false);

  // Handle iframe load event
  const handleLoad = () => {
    setIsLoaded(true);
  };

    return (
      <div className="Atlanta" style={{ position: 'relative', width: '100%', height: '100%' }}>
      {!isLoaded && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          Loading...
          {/* You can replace "Loading..." with a spinner or any other loading indicator */}
        </div>
      )}
{/*        <h1>THE AT&T PERCH LIVING MURAL</h1>
        <h2> Connecting Neighborhoods... </h2>
       <p>Your zipcode is: {zipcode}</p> 
        <br></br>
        <h4>{ city }</h4>
        <h1>Watch the mural to see your impact</h1>
        <br></br>
        <br></br>
        <h1>#attatlperch</h1> 
        <br></br>
        <br></br>
        <img src={logo} className="logo" alt="Logo" />
        <br></br>
        <br></br>  --> */}
        <iframe
        src="https://readymag.website/u170488020/4927140/?link_target=parent"
        style={{ visibility: isLoaded ? 'visible' : 'hidden', transition: 'visibility 0s linear 0.5s' }}
        onLoad={handleLoad}
        allowTransparency="true"
        frameBorder="0"
        scrolling="no"
        width="100%"
        height="100%"
      />
      </div>
      
    );
  }
  
  export default Atlanta;