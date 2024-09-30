import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import uszips from '../data/USCities.json';
import Footer from './Footer';
import Header from './Header';

const stateMessages = {
  "Alabama": "Hey Alabama! Just a quick hop across the state line, we're thrilled to have our Southern neighbors here. Roll Tide or War Eagle, we're all connected today! Welcome to The AT&T Perch!",
  "Alaska": "Wow, Alaska! You've traveled over 3,000 miles to get here. From the Last Frontier to our vibrant city, we're stoked to have you here at The AT&T Perch. Let’s make it memorable!",
  "Arizona": "Hey Arizona! Greetings from The AT&T Perch. Whether you're chillin’ in the desert or cheering on the Cardinals, we're pumped to have you with us!",
  "Arkansas": "Welcome Arkansas! We're excited to have you here. From Razorback country to our city lights, let’s make this a great visit! Welcome to The AT&T Perch!",
  "California": "WOW California! All the way from the West Coast! From the Golden State to the Peach State, we’re ready to make some epic memories with you. Welcome to The AT&T Perch!",
  "Colorado": "Hey Colorado! You’ve journeyed over 1,200 miles to be here. From the Rockies to our city, we’re hyped to have you here.",
  "Connecticut": "Hey Connecticut! Let's mix your New England charm with our Southern hospitality! Welcome to The AT&T Perch!",
  "Delaware": "Hello Delaware! Welcome to The AT&T Perch, From the First State to our vibrant city, we’re excited to have you here.",
  "Florida": "Hello Florida! A sunny hello from us at The AT&T Perch to you!",
  "Georgia": "Hey Georgia! A warm welcome from The AT&T Perch. Whether you're cruising in from the suburbs or repping the ATL, we're here to keep our Peach State fam connected and feeling at home. Let’s get it, Georgia!",
  "Hawaii": "Aloha Hawaii! Did you know you traveled over 4,700 miles to be here? From island vibes to our city lights, we're excited to connect with you here at The AT&T Perch.",
  "Idaho": "Hey Idaho! From your state's delicious potatoes to our dazzling city of peaches, we're excited to have you here at The AT&T Perch!",
  "Illinois": "Hi Illinois! From deep-dish pizza in Chicago to your cornfields downstate, we're your connection across the Prairie State. Welcome to The AT&T Perch!",
  "Indiana": "Hey Indiana! Whether you're racing at the Indy 500 or enjoying Hoosier hospitality, we're here to keep you in the fast lane in the ATL. We're excited to connect with you at The AT&T Perch!",
  "Iowa": "Hello Iowa! From rolling plains to the Iowa State Fair, we're your connection to the heartland of peach country. Welcome to The AT&T Perch!",
  "Kansas": "Hi Kansas! From sunflower fields to Wizard of Oz wonders, we're your connection here at The AT&T Perch! Welcome to the third largest supplier of peaches!",
  "Kentucky": "Hey Kentucky! From Derby Day in Louisville to bourbon trails, we're here to keep you running smooth at The AT&T Perch! We invite you to enjoy all that the ATL has to offer.",
  "Louisiana": "Hello Louisiana! Whether you're jazzing it up in New Orleans or exploring the bayou, we've got your back here at The AT&T Perch. We invite you to enjoy all that the ATL has to offer.",
  "Maine": "Hey Maine! Did you know you can start the Appalachian and hike all the way down to Georgia? We are thrilled to connect with you here at The AT&T Perch!",
  "Maryland": "Hey Maryland! From Baltimore’s Inner Harbor to Chesapeake Bay crabbing, we've got you covered here at The AT&T Perch. We invite you to enjoy all that the ATL has to offer.",
  "Massachusetts": "Hello Massachusetts! Whether you're walking the Freedom Trail or hitting the Cape, we're here to keep you in touch here at The AT&T Perch. We invite you to enjoy all that the ATL has to offer.",
  "Michigan": "Hi Michigan! From Detroit’s motor city magic to UP’s natural beauty, we're your bridge to connection here at The AT&T Perch. We invite you to enjoy all that the ATL has to offer.",
  "Minnesota": "Hey Minnesota! From Minneapolis lakes to north woods escapes, we're here to keep your connections nice and cool here at The AT&T Perch. We invite you to enjoy all that the ATL has to offer.",
  "Mississippi": "Hello Mississippi! From Delta blues to southern comfort, we're here to keep your connections as smooth as possible here at The AT&T Perch. We invite you to enjoy all that the ATL has to offer.",
  "Missouri": "Hi Missouri! Whether you're arching it up in St. Louis or exploring the Ozarks, we welcome our friends from the Show Me State to The AT&T Perch! We invite you to enjoy all that the ATL has to offer.",
  "Montana": "Hey Montana! From Big Sky vistas to Yellowstone wonders, we're here to keep you roaming wide and free at The AT&T Perch. We invite you to enjoy all that the ATL has to offer.",
  "Nebraska": "Hello Nebraska! From Omaha's bustle to prairie peace, we're your connection in the Cornhusker State. Welcome to The AT&T Perch! We invite you to enjoy all that the ATL has to offer.",
  "Nevada": "Hi Nevada! From Vegas lights to Reno nights, we're your jackpot connection here at The AT&T Perch! We invite you to enjoy all that the ATL has to offer.",
  "New Hampshire": "Hey New Hampshire! Welcome to The AT&T Perch! From mountain hikes to city lights, we're excited to have you here in the ATL. We invite you to enjoy all that the city has to offer.",
  "New Jersey": "Hey New Jersey! We're thrilled to have you here at The AT&T Perch! Did you know New Jersey has the most diners in the world, but Georgia is the third largest supplier of peaches? We invite you to enjoy all that Georgia and the city of ATL has to offer.",
  "New Mexico": "Hi New Mexico! From Santa Fe arts to Albuquerque's balloon fiesta, we're here to keep your connections colorful at The AT&T Perch! We invite you to enjoy all that the ATL has to offer.",
  "New York": "Yo New York! From NYC's hustle and bustle to Adirondack calm, we're your Empire State link here at The AT&T Perch! We invite you to enjoy all that the ATL has to offer.",
  "North Carolina": "Hi North Carolina! From the Blue Ridge Mountains to the Outer Banks, we're here to keep our Carolinian connection thriving at The AT&T Perch. We invite you to enjoy all that the ATL has to offer.",
  "North Dakota": "Hi North Dakota! From Fargo’s charm to Badlands beauty, we're here to keep you in touch at The AT&T Perch! We invite you to enjoy all that the ATL has to offer.",
  "Ohio": "Hey Ohio! From Cleveland rock to Cincinnati roll, we're your Buckeye connection here at The AT&T Perch. We invite you to enjoy all that the ATL has to offer.",
  "Oklahoma": "Hello Oklahoma! From Oklahoma City’s cowboy spirit to prairie winds, we're your Sooner connection here at The AT&T Perch! We invite you to enjoy all that the ATL has to offer.",
  "Oregon": "Hi Oregon! From Portland’s quirkiness to Crater Lake’s majesty, we're here to keep you weirdly connected at The AT&T Perch! We invite you to enjoy all that the ATL has to offer.",
  "Pennsylvania": "Hey Pennsylvania! From Philly’s history to Pittsburgh’s steel, we're your Keystone connection here at The AT&T Perch! We invite you to enjoy all that the ATL has to offer.",
  "Rhode Island": "Hi Rhode Island! From Providence's grace to Newport’s fun, we're here to keep you connected at The AT&T Perch! We invite you to enjoy all that the ATL has to offer.",
  "South Carolina": "Hey South Carolina! Whether you're strolling through Charleston or relaxing on Myrtle Beach, we’re delighted to keep your Southern charm connected here at The AT&T Perch! We invite you to enjoy all that the ATL has to offer.",
  "South Dakota": "Hey South Dakota! From Mount Rushmore’s grandeur to Badlands beauty, we're your Great Plains connection here at The AT&T Perch! We invite you to enjoy all that the ATL has to offer.",
  "Tennessee": "Hello Tennessee! From Nashville's tunes to Smoky Mountain retreats, we're all about keeping our Volunteer squad connected here at The AT&T Perch! We invite you to enjoy all that the ATL has to offer.",
  "Texas": "Hi Texas! From Houston’s space scenes to Austin’s music vibes, we're your Lone Star connection here at The AT&T Perch! We invite you to enjoy all that the ATL has to offer.",
  "Utah": "Hey Utah! From Salt Lake’s peaks to Arches’ red rocks, we're your Beehive State connection here at The AT&T Perch! Welcome to the third largest supplier of peaches!",
  "Vermont": "Hello Vermont! From Burlington’s lakeside to Green Mountain hikes, we're your maple-sweet connection here at The AT&T Perch. We invite you to enjoy all that the ATL has to offer.",
  "Virginia": "Hi Virginia! From Richmond’s history to Blue Ridge vistas, we're your Old Dominion connection here at The AT&T Perch. We invite you to enjoy all that the ATL has to offer.",
  "Washington": "Hey Washington! From Seattle’s skyline to Olympic Peninsula’s wild, we're your Evergreen State connection here at The AT&T Perch. We invite you to enjoy all that the ATL has to offer.",
  "West Virginia": "Hello West Virginia! From Charleston’s charm to Appalachian adventures, we're here to keep your connections wild and wonderful at The AT&T Perch! We invite you to enjoy all that the ATL has to offer.",
  "Wisconsin": "Hi Wisconsin! From Milwaukee’s brews to Door County’s views, we're your Badger State connection here at The AT&T Perch! We invite you to enjoy all that the ATL has to offer.",
  "Wyoming": "Hey Wyoming! From Cheyenne’s rodeos to Yellowstone’s wonders, we’re your wide-open spaces connection here at The AT&T Perch! We invite you to enjoy all that the ATL has to offer."
};

function findStateByZip(zipCode) {
  const numericZipCode = Number(zipCode);
  const result = uszips.find(entry => entry.zip_code === numericZipCode);
  return result ? result.state : 'ZIP code not found';
}

function State() {
  const navigate = useNavigate();
  const location = useLocation();
  const zipcode = location.state?.zipcode; // Get the zipcode from the state
  const [isFading, setIsFading] = useState(false);
  const [opacity, setOpacity] = useState(0); // State for fade-in

  console.log("ZIP Code:", zipcode); // Log the zipcode

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
    }, 3500); // Wait for 3.5 seconds before starting the fade

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="State" style={{ opacity, transition: 'opacity 1s ease-in-out' }}>
      <Header />
      <p>From     To</p>
      <h4>ATL {">>"} {state}</h4>
      <br />
      {/* Display the state message here */}
      <p>{message}</p>
      <br />
      <br />
      <Footer />
      <br />
      <br />
    </div>
  );
}

export default State;
