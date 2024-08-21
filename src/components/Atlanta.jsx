import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import uszips from '../data/USCities.json';
import logo from '../att-logo.png';
//import { Link } from 'react-router-dom';
// import '../App.css';

function findCityByZip(zipCode) {
  const numericZipCode = Number(zipCode);
  const result = uszips.find(entry => entry.zip_code === numericZipCode);
  return result ? result.city : 'ZIP code not found';
}

function Atlanta({ zip }) { 
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
      <div className="Atlanta">  
        {!isLoaded && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
          Loading...
          {/* Replace with a spinner or a more sophisticated loading indicator if needed */}
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
       <iframe class="iframe" src="https://readymag.website/u170488020/4927140/?link_target=parent" frameborder="0" scrolling="no"></iframe>
      </div>
      
    );
  }
  
  export default Atlanta;