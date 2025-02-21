import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import uszips from '../data/USCities.json';
import Footer from './Footer';
import Header from './Header';

const stateMessages = {
  "AL": "Hey Alabama! Just a quick hop across the state line, we're thrilled to have our Southern neighbors here. Roll Tide or War Eagle, we're all connected today! Welcome to The AT&T Perch!",
  "AK": "Wow, Alaska! You've traveled over 3,000 miles to get here. From the Last Frontier to our vibrant city, we're stoked to have you here at The AT&T Perch. Let’s make it memorable!",
  "AZ": "Hey Arizona! Greetings from The AT&T Perch. Whether you're chillin’ in the desert or cheering on the Cardinals, we're pumped to have you with us!",
  "AR": "Welcome Arkansas! We're excited to have you here. From Razorback country to our city lights, let’s make this a great visit! Welcome to The AT&T Perch!",
  "CA": "WOW California! All the way from the West Coast! From the Golden State to the Peach State, we’re ready to make some epic memories with you. Welcome to The AT&T Perch!",
  "CO": "Hey Colorado! You’ve journeyed over 1,200 miles to be here. From the Rockies to our city, we’re hyped to have you here.",
  "CT": "Hey Connecticut! Let's mix your New England charm with our Southern hospitality! Welcome to The AT&T Perch!",
  "DE": "Hello Delaware! Welcome to The AT&T Perch, From the First State to our vibrant city, we’re excited to have you here.",
  "FL": "Hello Florida! A sunny hello from us at The AT&T Perch to you!",
  "GA": "Hey Georgia! A warm welcome from The AT&T Perch. Whether you're cruising in from the suburbs or repping the ATL, we're here to keep our Peach State fam connected and feeling at home. Let’s get it, Georgia!",
  "HI": "Aloha Hawaii! Did you know you traveled over 4,700 miles to be here? From island vibes to our city lights, we're excited to connect with you here at The AT&T Perch.",
  "ID": "Hey Idaho! From your state's delicious potatoes to our dazzling city of peaches, we're excited to have you here at The AT&T Perch!",
  "IL": "Hi Illinois! From deep-dish pizza in Chicago to your cornfields downstate, we're your connection across the Prairie State. Welcome to The AT&T Perch!",
  "IN": "Hey Indiana! Whether you're racing at the Indy 500 or enjoying Hoosier hospitality, we're here to keep you in the fast lane in the ATL. We're excited to connect with you at The AT&T Perch!",
  "IA": "Hello Iowa! From rolling plains to the Iowa State Fair, we're your connection to the heartland of peach country. Welcome to The AT&T Perch!",
  "KS": "Hi Kansas! From sunflower fields to Wizard of Oz wonders, we're your connection here at The AT&T Perch! Welcome to the third largest supplier of peaches!",
  "KY": "Hey Kentucky! From Derby Day in Louisville to bourbon trails, we're here to keep you running smooth at The AT&T Perch! We invite you to enjoy all that the ATL has to offer.",
  "LA": "Hello Louisiana! Whether you're jazzing it up in New Orleans or exploring the bayou, we've got your back here at The AT&T Perch. We invite you to enjoy all that the ATL has to offer.",
  "ME": "Hey Maine! Did you know you can start the Appalachian and hike all the way down to Georgia? We are thrilled to connect with you here at The AT&T Perch!",
  "MD": "Hey Maryland! From Baltimore’s Inner Harbor to Chesapeake Bay crabbing, we've got you covered here at The AT&T Perch. We invite you to enjoy all that the ATL has to offer.",
  "MA": "Hello Massachusetts! Whether you're walking the Freedom Trail or hitting the Cape, we're here to keep you in touch here at The AT&T Perch. We invite you to enjoy all that the ATL has to offer.",
  "MI": "Hi Michigan! From Detroit’s motor city magic to UP’s natural beauty, we're your bridge to connection here at The AT&T Perch. We invite you to enjoy all that the ATL has to offer.",
  "MN": "Hey Minnesota! From Minneapolis lakes to north woods escapes, we're here to keep your connections nice and cool here at The AT&T Perch. We invite you to enjoy all that the ATL has to offer.",
  "MS": "Hello Mississippi! From Delta blues to southern comfort, we're here to keep your connections as smooth as possible here at The AT&T Perch. We invite you to enjoy all that the ATL has to offer.",
  "MO": "Hi Missouri! Whether you're arching it up in St. Louis or exploring the Ozarks, we welcome our friends from the Show Me State to The AT&T Perch! We invite you to enjoy all that the ATL has to offer.",
  "MT": "Hey Montana! From Big Sky vistas to Yellowstone wonders, we're here to keep you roaming wide and free at The AT&T Perch. We invite you to enjoy all that the ATL has to offer.",
  "NE": "Hello Nebraska! From Omaha's bustle to prairie peace, we're your connection in the Cornhusker State. Welcome to The AT&T Perch! We invite you to enjoy all that the ATL has to offer.",
  "NV": "Hi Nevada! From Vegas lights to Reno nights, we're your jackpot connection here at The AT&T Perch! We invite you to enjoy all that the ATL has to offer.",
  "NH": "Hey New Hampshire! Welcome to The AT&T Perch! From mountain hikes to city lights, we're excited to have you here in the ATL. We invite you to enjoy all that the city has to offer.",
  "NJ": "Hey New Jersey! We're thrilled to have you here at The AT&T Perch! Did you know New Jersey has the most diners in the world, but Georgia is the third largest supplier of peaches? We invite you to enjoy all that Georgia and the city of ATL has to offer.",
  "NM": "Hi New Mexico! From Santa Fe arts to Albuquerque's balloon fiesta, we're here to keep your connections colorful at The AT&T Perch! We invite you to enjoy all that the ATL has to offer.",
  "NY": "Yo New York! From NYC's hustle and bustle to Adirondack calm, we're your Empire State link here at The AT&T Perch! We invite you to enjoy all that the ATL has to offer.",
  "NC": "Hi North Carolina! From the Blue Ridge Mountains to the Outer Banks, we're here to keep our Carolinian connection thriving at The AT&T Perch. We invite you to enjoy all that the ATL has to offer.",
  "ND": "Hi North Dakota! From Fargo’s charm to Badlands beauty, we're here to keep you in touch at The AT&T Perch! We invite you to enjoy all that the ATL has to offer.",
  "OH": "Hey Ohio! From Cleveland rock to Cincinnati roll, we're your Buckeye connection here at The AT&T Perch. We invite you to enjoy all that the ATL has to offer.",
  "OK": "Hello Oklahoma! From Oklahoma City’s cowboy spirit to prairie winds, we're your Sooner connection here at The AT&T Perch! We invite you to enjoy all that the ATL has to offer.",
  "OR": "Hi Oregon! From Portland’s quirkiness to Crater Lake’s majesty, we're here to keep you weirdly connected at The AT&T Perch! We invite you to enjoy all that the ATL has to offer.",
  "PA": "Hey Pennsylvania! From Philly’s history to Pittsburgh’s steel, we're your Keystone connection here at The AT&T Perch! We invite you to enjoy all that the ATL has to offer.",
  "RI": "Hi Rhode Island! From Providence's grace to Newport’s fun, we're here to keep you connected at The AT&T Perch! We invite you to enjoy all that the ATL has to offer.",
  "SC": "Hey South Carolina! Whether you're strolling through Charleston or relaxing on Myrtle Beach, we’re delighted to keep your Southern charm connected here at The AT&T Perch! We invite you to enjoy all that the ATL has to offer.",
  "SD": "Hey South Dakota! From Mount Rushmore’s grandeur to Badlands beauty, we're your Great Plains connection here at The AT&T Perch! We invite you to enjoy all that the ATL has to offer.",
  "TN": "Hello Tennessee! From Nashville's tunes to Smoky Mountain retreats, we're all about keeping our Volunteer squad connected here at The AT&T Perch! We invite you to enjoy all that the ATL has to offer.",
  "TX": "Hi Texas! From Houston’s space scenes to Austin’s music vibes, we're your Lone Star connection here at The AT&T Perch! We invite you to enjoy all that the ATL has to offer.",
  "UT": "Hey Utah! From Salt Lake’s peaks to Arches’ red rocks, we're your Beehive State connection here at The AT&T Perch! Welcome to the third largest supplier of peaches!",
  "VT": "Hello Vermont! From Burlington’s lakeside to Green Mountain hikes, we're your maple-sweet connection here at The AT&T Perch. We invite you to enjoy all that the ATL has to offer.",
  "VA": "Hi Virginia! From Richmond’s history to Blue Ridge vistas, we're your Old Dominion connection here at The AT&T Perch. We invite you to enjoy all that the ATL has to offer.",
  "WA": "Hey Washington! From Seattle’s skyline to Olympic Peninsula’s wild, we're your Evergreen State connection here at The AT&T Perch. We invite you to enjoy all that the ATL has to offer.",
  "WV": "Hello West Virginia! From Charleston’s charm to Appalachian adventures, we're here to keep your connections wild and wonderful at The AT&T Perch! We invite you to enjoy all that the ATL has to offer.",
  "WI": "Hi Wisconsin! From Milwaukee’s brews to Door County’s views, we're your Badger State connection here at The AT&T Perch! We invite you to enjoy all that the ATL has to offer.",
  "WY": "Hey Wyoming! From Cheyenne’s rodeos to Yellowstone’s wonders, we’re your wide-open spaces connection here at The AT&T Perch! We invite you to enjoy all that the ATL has to offer."
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

function State() {
  const navigate = useNavigate();
  const location = useLocation();
  const zipcode = location.state?.zipcode; // Get the zipcode from the state
  const [isFading, setIsFading] = useState(false);
  const [opacity, setOpacity] = useState(0); // State for fade-in

  // console.log("ZIP Code:", zipcode); // Log the zipcode

  const state = zipcode ? findStateByZip(zipcode) : 'ZIP code not provided';
  // console.log("State:", state); // Log the state

  // Get the corresponding state message
  const message = state !== 'ZIP code not found' ? stateMessages[state] : "Sorry, we don't have a message for that state.";

  useEffect(() => {
    const fadeInTimer = setTimeout(() => {
      setOpacity(1); // Set opacity to 1 after a delay to trigger fade-in
    }, 100); // Delay before starting fade in

    const timer = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        navigate('/finalpage');
      }, 1000); // Duration of fade-out effect
    }, 7500); // Wait for 6.5 seconds before starting the fade

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div>
      <Header />
      <div className="State" style={{ opacity, transition: 'opacity 1s ease-in-out' }}>
      <p style={{ whiteSpace: 'pre' }}>From                To</p>
        <h5>{state} → ATL</h5>
        <br />
        {/* Display the state message here */}
        <p>{message}</p>
        <br />
        <p>Watch the mural to see how you connect with other fans.</p>
        <p>Tag us @ATT</p>
        <br />
        <br />
        <br />
        <br />
      </div>
      <Footer />
    </div>
  );
}

export default State;
