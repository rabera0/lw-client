import React from 'react';
import { useState } from 'react';
import atlzips from '../data/atlzips.json';
import { useNavigate } from 'react-router-dom';
import logo from '../att-logo.png';
import useWebSockets from '../useWebSocket';
import uszips from '../data/USCities.json';
// import '../App.css';

const Zipcode = () => {
  const [zipcode, setZipcode] = useState('');
  const [isAtlanta, setIsAtlanta] = useState(false);
  const navigate = useNavigate();
  const { messageHistory, connectionStatus, handleClickChangeSocketUrl, handleClickSendMessage } = useWebSockets('wss://lofty-tar-author.glitch.me/');

   //console.log(atlzips);

// checing atlanta zipcode
  const checkAtl = (zip) => {
    const zipString = zip.toString();
    return atlzips.AtlantaZipCodes.includes(zipString);
  };

  // checing if existing zipcode
  const checkZipcode = (zip) => {
    const zipString = zip.toString();
    return uszips.some(entry => entry.zip_code.toString() === zipString);
  };

  const displayMessage = (message) => {
    const messageContainer = document.getElementById('message-container');
    if (messageContainer) {
      // Clear previous messages
      messageContainer.innerHTML = '';
      // Create a new <h5> element
      const h5 = document.createElement('h5');
      h5.textContent = message;
      // Append the <p> element to the container
      messageContainer.appendChild(h5);
    }
  };

//redirecting based on if user is in atlanta or elsewhere nationally
  const handleSubmit = (event) => {
    event.preventDefault();
       // if (zipcode) {
    //   handleClickSendMessage(zipcode);
    // } 
    handleClickSendMessage(zipcode);
    if (!checkZipcode(zipcode)) {
      displayMessage('Zip code does not exist. Try again');
      return;
    } 
    if (checkAtl(zipcode)) {
      setIsAtlanta(true);
      navigate('/atlanta', { state: { zipcode } }); 
    } else {
      setIsAtlanta(false);
      navigate('/national', { state: { zipcode } });
    }
  };
  
    return (
      <div className="Zipcode">
        <h1>THE AT&T PERCH LIVING MURAL</h1>
        <br></br>
        <p>Where are you from?</p>
        <br></br>
        <form onSubmit={handleSubmit}>
          <input 
            placeholder="enter your input"
            className="zip"
            name="zip"
            id="zip"
            type="text" 
            inputMode="numeric" 
            pattern="[0-9]*"
            maxLength="5"
            value={zipcode}
            onChange={(event) => {
              const { value } = event.target;
              setZipcode(value.replace(/[^\d{5}]$/, "").substr(0, 5));
            }}
          />
           <br></br>
          <br></br>
          <button type="submit">Submit</button>
          <br></br>
          <div id="message-container"></div>
        </form>
        <br></br>
        <br></br>
        <br></br>
        <img src={logo} className="logo" alt="Logo" />
        <br></br>
        <br></br>
      </div>
    );
  }
  
  export default Zipcode;
