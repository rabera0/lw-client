import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import uszips from "../data/USCities.json";
import logo from "../att-logo.png";
//import { Link } from 'react-router-dom';
// import '../App.css';

// zipcodeMessages.js
const zipcodeMessages = [
    { zip: "Mistype", message: "Welcome to the Perch! Happy to connect you to Atlanta!" },
    { zip: "30339", message: "Hello Vinings! Welcome to the AT&T Perch!" },
    { zip: "30305", message: "Hello “Golden Triangle” Buckhead and Northside area, Welcome to the AT&T Perch" },
    { zip: "30342", message: "Hello “Golden Triangle” Buckhead and Northside area, Welcome to the AT&T Perch" },
    { zip: "30327", message: "Hello “Golden Triangle” Buckhead and Northside area, Welcome to the AT&T Perch" },
    { zip: "30324", message: "Hello Morningside! Welcome to the AT&T Perch" },
    { zip: "30326", message: "Hi Lenox & Buckhead Heights! Welcome to the AT&T Perch!" },
    { zip: "30084", message: "Hi Tucker! Welcome to the AT&T Perch" },
    { zip: "30345", message: "Hi North Lake! Welcome to the AT&T Perch" },
    { zip: "30341", message: "Hello Chamblee, So happy to have you here at the AT&T Perch" },
    { zip: "30333", message: "We see you're from the Toco Hills area, Welcome to the AT&T Perch." },
    { zip: "30329", message: "Hi Druid Hills! Welcome to the AT&T Perch" },
    { zip: "30322", message: "Hello Emory University! Welcome to the AT&T Perch" },
    { zip: "30319", message: "Hey Brookhaven! So happy to have you here at the AT&T Perch" },
    { zip: "30079", message: "We see you're from Scottdale and Avondale Estates! Welcome to the AT&T Perch" },
    { zip: "30002", message: "We see you're from Scottdale and Avondale Estates! Welcome to the AT&T Perch" },
    { zip: "30030", message: "Hi Decatur! Welcome to the AT&T Perch" },
    { zip: "30032", message: "Hello Eastside Neighbors! Welcome to the AT&T Perch" },
    { zip: "30034", message: "Hello Eastside Neighbors! Welcome to the AT&T Perch" },
    { zip: "30317", message: "What's Up Kirkwood! So happy to have you here at the AT&T Perch" },
    { zip: "30316", message: "Hey East Atlanta! So happy to have you here at the AT&T Perch" },
    { zip: "30315", message: "We see you're coming from East Atlanta & South Atlanta, So happy to have you here at the AT&T Perch" },
    { zip: "30288", message: "Hey Conley and Ellenwood! Welcome to the AT&T Perch" },
    { zip: "30294", message: "Hey Conley and Ellenwood! Welcome to the AT&T Perch" },
    { zip: "30309", message: "Welcome Midtown and Atlantic Station! So happy to have you here at the AT&T Perch" },
    { zip: "30363", message: "Welcome Midtown and Atlantic Station! So happy to have you here at the AT&T Perch" },
    { zip: "30308", message: "Welcome Midtown! So happy to have you here at the AT&T Perch" },
    { zip: "30307", message: "Hey Little Five Points! Welcome to the AT&T Perch" },
    { zip: "30306", message: "Hello Virginia-Highland! So happy to have you here at the AT&T Perch" },
    { zip: "30312", message: "Hello Grant Park! Welcome to the AT&T Perch!" },
    { zip: "30303", message: "Hello Downtown Atlanta! So happy to have you here at the AT&T Perch" },
    { zip: "30313", message: "Hello Downtown Atlanta! So happy to have you here at the AT&T Perch" },
    { zip: "30318", message: "Greetings, West Midtown! Welcome to the AT&T Perch" },
    { zip: "30331", message: "Welcome Camp Creek & Cascade, So happy to have you here at the AT&T Perch" },
    { zip: "30311", message: "We see you're coming from the Westside! Welcome to the AT&T Perch" },
    { zip: "30314", message: "We see you're coming from the Westside! Welcome to the AT&T Perch" },
    { zip: "30310", message: "Hello West End! So happy to have you here at the AT&T Perch" },
    { zip: "30344", message: "Welcome East Point community! So happy to have you here at the AT&T Perch" },
    { zip: "30354", message: "We see you're coming from the Southside! So happy to have you here at the AT&T Perch" },
    { zip: "30337", message: "Hi College Park! Welcome to the AT&T Perch" },
];

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

  // Retrieve the message from zipcodeMessages based on the provided zipcode
  const message = zipcodeMessages.find(item => item.zip === zipcode)?.message || "Welcome!";
  console.log(message);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        navigate('/finalpage');
      }, 1000); // Duration of fade-out effect
    }, 3500); // Wait for 3.5 seconds before starting the fade

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={`Atlanta`}>
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
      
      <p>{message}</p> {/* Replace "county message" with the retrieved message */}
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
