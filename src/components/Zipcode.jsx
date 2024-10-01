import React from 'react';
import { useState } from 'react';
import atlzips from '../data/atlzips.json';
import { useNavigate } from 'react-router-dom';
import useWebSockets from '../useWebSocket';
import uszips from '../data/USCities.json';
import Footer from './Footer';
import Header from './Header';

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
     if (zipcode.length !== 5 || !/^\d{5}$/.test(zipcode)) {
      return;
    }
    handleClickSendMessage(zipcode);
    if (!checkZipcode(zipcode)) {
      displayMessage('Looks like that zip code does not exist, are you an ATLalien? Try Again');
      return;
    } 
    if (checkAtl(zipcode)) {
      setIsAtlanta(true);
      navigate('/atlmap', { state: { zipcode } }); 
    } else {
      setIsAtlanta(false);
      navigate('/statemap', { state: { zipcode } });
    }
  };
  
    return (
      <div>
        <Header />
        <div  className="Zipcode">
          <p>What is your zipcode?</p>
          <br></br>
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
          <br />
          <br />
          <br />
          <br />
          <br></br>
        </div>
        <Footer />
      </div>
    );
  }
  
  export default Zipcode;
