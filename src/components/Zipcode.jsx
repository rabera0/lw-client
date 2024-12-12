import React from 'react';
import { useState, useCallback, useEffect  } from 'react';
import atlzips from '../data/atlzips.json';
import { useNavigate } from 'react-router-dom';
import useWebSockets from '../useWebSocket';
import uszips from '../data/USCities.json';
import Footer from './Footer';
import Header from './Header';


const Zipcode = () => {
  const stateDir = {
    "IN": "N",
    "KY": "N",
    "MI": "N",
    "MN": "N",
    "OH": "N",
    "TN": "N",
    "WI": "N",
    "IA": "N",
    "CT": "NE",
    "DE": "NE",
    "MD": "NE",
    "ME": "NE",
    "MA": "NE",
    "NH": "NE",
    "NJ": "NE",
    "NY": "NE",
    "NC": "NE",
    "PA": "NE",
    "RI": "NE",
    "VT": "NE",
    "VA": "NE",
    "WV": "NE",
    "SC": "E",
    "FL": "SE",
    "GA": "SE",
    "HI": "SW",
    "LA": "SW",
    "NM": "W",
    "TX": "W",
    "AL": "W",
    "AZ": "W",
    "AR": "W",
    "CA": "W",
    "CO": "NW",
    "MS": "W",
    "NE": "NW",
    "OK": "NW",
    "KS": "NW",
    "UT": "NW",
    "WY": "NW",
    "AK": "NW",
    "ID": "NW",
    "IL": "NW",
    "MO": "NW",
    "MT": "NW",
    "NV": "NW",
    "ND": "NW",
    "OR": "NW",
    "SD": "NW",
    "WA": "NW"
  }
  const [zipcode, setZipcode] = useState('');
  const [isAtlanta, setIsAtlanta] = useState(false);
  const navigate = useNavigate();
  const { handleClickSendMessage } = useWebSockets('wss://lw-server-ce19694e9edf.herokuapp.com/');
  
  const DEBOUNCE_DELAY = 300; // Adjust the delay as needed
  let debounceTimer;

  // Checking Atlanta zipcode
  const checkAtl = (zip) => {
    const zipString = zip.toString();
    return atlzips.AtlantaZipCodes.includes(zipString);
  };

  // Checking if existing zipcode
  const checkZipcode = (zip) => {
    const zipString = zip.toString();
    return uszips.some(entry => entry.zip_code.toString() === zipString);
  };

  function findStateByZip(zipCode) {
    const numericZipCode = Number(zipCode);
    const result = uszips.find(entry => entry.zip_code === numericZipCode);
    return result ? result.state : 'ZIP code not found';
  }

   // Function to find direction by state
   function findDirectionByState(state) {
    return stateDir[state] || null; // Return null if state not found
  }

  const state = zipcode ? findStateByZip(zipcode) : null;
  const direction = state ? findDirectionByState(state) : null;

  const displayMessage = (message) => {
    const messageContainer = document.getElementById('message-container');
    if (messageContainer) {
      // Clear previous messages
      messageContainer.innerHTML = '';
      // Create a new <h5> element
      const p = document.createElement('p');
      p.textContent = message;
      // Append the <p> element to the container
      messageContainer.appendChild(p);
    }
  };

  const handleSubmit = useCallback((event) => {
    event.preventDefault();

    if (zipcode.length !== 5 || !/^\d{5}$/.test(zipcode)) {
      return;
    }

    if (!checkZipcode(zipcode)) {
      displayMessage('Looks like that zip code does not exist, are you an ATLalien? Try Again');
      return;
    }

    if (checkAtl(zipcode)) {
      setIsAtlanta(true);
      handleClickSendMessage(zipcode);
      navigate('/atlmap', { state: { zipcode } }); 
    } else {
      setIsAtlanta(false);
      handleClickSendMessage(direction);
      navigate('/statemap', { state: { zipcode } });
    }
  }, [zipcode, handleClickSendMessage, navigate]);

  useEffect(() => {
    // Clean up the debounce timer on unmount
    return () => {
      clearTimeout(debounceTimer);
    };
  }, []);

  const handleDebouncedSubmit = (event) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      handleSubmit(event);
    }, DEBOUNCE_DELAY);
  };
  
    return (
      <div>
        <Header />
        <div  className="Zipcode">
          <br />
          <p>Select where you are from?</p>
          <br />
          <form onSubmit={handleSubmit}>
            <input 
              placeholder="enter zipcode here"
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
          <br />
          <br />
          <br></br>
        </div>
        <Footer />
      </div>
    );
  }
  
  export default Zipcode;
