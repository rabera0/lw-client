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

  // Checking if the ZIP code exists (loose matching included)
  const checkZipcode = (zip) => {
    const zipString = zip.toString();
    console.log("Checking ZIP existence for:", zipString);

    // Exact match check
    const exactMatch = uszips.some(entry => entry.zip_code.toString() === zipString);
    if (exactMatch) {
      console.log("Exact match found for ZIP:", zipString);
      return true;
    }

    // Loose match: check if any ZIP starts with the same first 3 digits AND has the same number of digits
    const zipPrefix = zipString.slice(0, 3);
    const zipLength = zipString.length;

    const looseMatch = uszips.some(entry => {
      const entryZipString = entry.zip_code.toString();
      return entryZipString.startsWith(zipPrefix) && entryZipString.length === zipLength;
    });

    console.log(looseMatch ? `Loose match found for ZIP prefix ${zipPrefix} with length ${zipLength}` : "No match found");
    return looseMatch;
  };

  // Find state by ZIP code with loose matching
  function findStateByZip(zipCode) {
    const numericZipCode = Number(zipCode);
    const zipString = numericZipCode.toString();
    console.log("Searching for state by ZIP:", zipString);

    // Try to find an exact match first
    const exactMatch = uszips.find(entry => entry.zip_code.toString() === zipString);
    if (exactMatch) {
      console.log("Exact match found:", exactMatch.state);
      return exactMatch.state;
    }

    // If no exact match, try finding a match by the first three digits AND same number of digits
    const zipPrefix = zipString.slice(0, 3);
    const zipLength = zipString.length;

    console.log(`Looking for ZIPs starting with ${zipPrefix} and length ${zipLength}`);

    const closestMatch = uszips.find(entry => {
      const entryZipString = entry.zip_code.toString();
      return entryZipString.startsWith(zipPrefix) && entryZipString.length === zipLength;
    });

    console.log(closestMatch ? `Loose match found: ${closestMatch.state}` : "No match found");
    return closestMatch ? closestMatch.state : 'ZIP code not found';
  }

  // Function to find direction by state
  function findDirectionByState(state) {
    return stateDir[state] || null; // Return null if state not found
  }

  const displayMessage = (message) => {
    const messageContainer = document.getElementById('message-container');
    if (messageContainer) {
      // Clear previous messages
      messageContainer.innerHTML = '';
      // Create a new <p> element
      const p = document.createElement('p');
      p.textContent = message;
      // Append the <p> element to the container
      messageContainer.appendChild(p);
    }
  };

  const handleSubmit = useCallback((event) => {
    event.preventDefault();

    // Allow ZIP codes with 3, 4, or 5 digits
    if (!/^\d{3,5}$/.test(zipcode)) {
      displayMessage('Invalid ZIP code format. Enter a 3, 4, or 5-digit ZIP.');
      return;
    }

    // Check if ZIP exists (including loose matches)
    if (!checkZipcode(zipcode)) {
      displayMessage('Looks like that ZIP code does not exist, are you an ATLalien? Try Again');
      return;
    }

    // Find state based on ZIP
    const state = findStateByZip(zipcode);
    console.log("Final determined state:", state);

    if (state === 'ZIP code not found') {
      displayMessage(state);
      return;
    }

    // Find direction based on the state
    const direction = findDirectionByState(state);
    console.log("Determined direction:", direction);

    if (checkAtl(zipcode)) {
      setIsAtlanta(true);
      handleClickSendMessage(zipcode);
      navigate('/atlmap', { state: { zipcode } }); 
    } else {
      setIsAtlanta(false);
      handleClickSendMessage(direction || "Unknown direction");
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
      <div className="Zipcode">
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