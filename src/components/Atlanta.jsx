import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import uszips from "../data/USCities.json";
import logo from "../att-logo.png";
//import { Link } from 'react-router-dom';
// import '../App.css';

function findCityByZip(zipCode) {
  const numericZipCode = Number(zipCode);
  const result = uszips.find((entry) => entry.zip_code === numericZipCode);
  return result ? result.city : "ZIP code not found";
}

function Atlanta() {
  const location = useLocation();
  const navigate = useNavigate();
  const zipcode = location.state?.zipcode;

  const city = zipcode ? findCityByZip(zipcode) : "ZIP code not provided";
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFading, setIsFading] = useState(false);

  // Handle iframe load event
  const handleLoad = () => {
    setIsLoaded(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        navigate('/finalpage');
      }, 1000); // Duration of fade-out effect
    }, 2500); // Wait for 5 seconds before starting the fade

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={`Atlanta ${isFading ? 'fade-out' : ''}`}>
      {!isLoaded && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
          }}
        >
        </div>
      )}
      <h1>THE AT&T PERCH LIVING MURAL</h1>
      
      <p>Hello "county message" </p>
      <br />
      <h4>{city}</h4>
      <br />
      <br />
      <p>Welcome to the AT&T Perch.</p>
      <br />
      <p>Watch the mural to see your impact</p>
      <br />
      <br />
      <h1>#attatlperch</h1>
      <br />
      <br />
      <img src={logo} className="logo" alt="Logo" />
      <br />
      <br />
    </div>
  );
}

export default Atlanta;
// <p>Your zipcode is: {zipcode}</p>
      // {!isLoaded && (
      //   <div
      //     style={{
      //       position: "absolute",
      //       top: "50%",
      //       left: "50%",
      //       transform: "translate(-50%, -50%)",
      //       zIndex: 1,
      //     }}
      //   >
      //     Loading...
      //   </div>
      // )}
