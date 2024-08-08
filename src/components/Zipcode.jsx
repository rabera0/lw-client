import React from 'react';
import { useState } from 'react';
import atlzips from '../data/atlzips.json';
import { useNavigate } from 'react-router-dom';
import logo from '../att-logo.png';
import useWebSocket from '../useWebSocket';
// import '../App.css';

function Zipcode() {
  const [zipcode, setZipcode] = useState("");
  const [isAtlanta, setIsAtlanta] = useState(false);
  const navigate = useNavigate();

   //console.log(atlzips);

// checing atlanta zipcode
  const checkZipcode = (zip) => {
    const zipString = zip.toString();
    return atlzips.AtlantaZipCodes.includes(zipString);
  };

//redirecting based on if user is in atlanta or elsewhere nationally
  const handleSubmit = (event) => {
    event.preventDefault();
    if (checkZipcode(zipcode)) {
      setIsAtlanta(true);
      navigate('/atlanta', { state: { zipcode } }); 
    } else {
      setIsAtlanta(false);
      navigate('/national', { state: { zipcode } });
    }
  };
  
  
  const { message } = useWebSocket('wss://pinnate-uttermost-fiber.glitch.me/');

    return (
      <div className="Zipcode">
        <h1>THE AT&T PERCH LIVING MURAL</h1>
        <br></br>
        <p>Where are you from?</p>
      
        <br></br>
        <br></br>
        <br></br>
        <form onSubmit={handleSubmit}>
          <input 
            placeholder="enter your input"
            className="zip"
            name="zip"
            id="zip"
            type="text" 
            value={zipcode}
            onChange={(event) => {
              const { value } = event.target;
              setZipcode(value.replace(/[^\d{5}]$/, "").substr(0, 5));
            }}
          />
        </form>
        <br></br>
        <br></br>
        {message && <p>Received from server: {zipcode}</p>}
        <br></br>
        
        <img src={logo} className="logo" alt="Logo" />
        <br></br>
        <br></br>
      </div>
    );
  }
  
  export default Zipcode;
