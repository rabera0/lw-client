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

  const gazips = {
    "N" : [30004, 30009, 30022, 30023, 30028, 30062, 30067, 30068, 30075, 30076, 30077, 30107, 30114, 30115, 30142, 30143, 30146, 30148, 30151, 30169, 30175, 30177, 30183, 30188, 30301, 30305, 30309, 30326, 30327, 30328, 30332, 30338, 30342, 30346, 30348, 30350, 30355, 30356, 30357, 30361, 30363, 30375, 30512, 30513, 30514, 30522, 30536, 30539, 30540, 30541, 30555, 30559, 30560, 30572, 30705, 30708, 30711, 30724, 30732, 30751],
    "NE": [30003, 30005, 30010, 30011, 30019, 30024, 30026, 30029, 30033, 30040, 30041, 30042, 30043, 30044, 30045, 30046, 30047, 30048, 30071, 30084, 30085, 30091, 30092, 30093, 30095, 30096, 30097, 30098, 30099, 30306, 30308, 30319, 30322, 30324, 30329, 30333, 30340, 30341, 30345, 30347, 30359, 30360, 30366, 30376, 30501, 30502, 30503, 30504, 30506, 30507, 30510, 30511, 30515, 30516, 30517, 30518, 30519, 30520, 30521, 30523, 30525, 30527, 30528, 30529, 30530, 30531, 30533, 30534, 30535, 30537, 30538, 30542, 30543, 30544, 30545, 30546, 30547, 30548, 30549, 30552, 30553, 30554, 30557, 30558, 30562, 30563, 30564, 30566, 30567, 30568, 30571, 30573, 30575, 30576, 30577, 30580, 30581, 30582, 30596, 30597, 30598, 30599, 30639],
    "E": [30002, 30012, 30013, 30014, 30015, 30017, 30018, 30021, 30025, 30030, 30031, 30032, 30035, 30036, 30037, 30038, 30039, 30052, 30054, 30055, 30056, 30058, 30070, 30072, 30073, 30074, 30078, 30079, 30083, 30086, 30087, 30088, 30094, 30302, 30307, 30317, 30321, 30343, 30353, 30370, 30392, 30394, 30426, 30434, 30442, 30446, 30456, 30467, 30565, 30601, 30602, 30603, 30604, 30605, 30606, 30607, 30608, 30609, 30612, 30619, 30620, 30621, 30622, 30623, 30624, 30625, 30627, 30628, 30629, 30630, 30631, 30633, 30634, 30635, 30638, 30641, 30642, 30643, 30645, 30646, 30647, 30648, 30650, 30655, 30656, 30660, 30662, 30663, 30664, 30665, 30666, 30667, 30668, 30669, 30671, 30673, 30677, 30678, 30680, 30683, 30802, 30803, 30805, 30806, 30807, 30808, 30809, 30810, 30811, 30812, 30813, 30814, 30815, 30816, 30817, 30818, 30819, 30820, 30821, 30822, 30823, 30824, 30828, 30830, 30833, 30901, 30903, 30904, 30905, 30906, 30907, 30909, 30911, 30912, 30913, 30914, 30916, 30917, 30919, 30999, 31045, 31087, 31094, 31303],
    "SE": [30016, 30034, 30049, 30164, 30216, 30233, 30234, 30248, 30252, 30253, 30273, 30281, 30288, 30294, 30312, 30316, 30379, 30387, 30389, 30390, 30399, 30401, 30410, 30411, 30412, 30413, 30414, 30415, 30417, 30420, 30421, 30423, 30424, 30425, 30427, 30428, 30429, 30436, 30438, 30439, 30441, 30445, 30447, 30448, 30449, 30450, 30451, 30452, 30453, 30454, 30455, 30457, 30458, 30459, 30460, 30461, 30464, 30470, 30471, 30473, 30474, 30475, 30477, 30499, 31001, 31002, 31003, 31004, 31005, 31008, 31009, 31011, 31012, 31013, 31014, 31017, 31018, 31019, 31020, 31021, 31022, 31023, 31024, 31025, 31026, 31027, 31028, 31029, 31030, 31031, 31032, 31033, 31034, 31035, 31036, 31037, 31038, 31040, 31042, 31044, 31046, 31047, 31049, 31050, 31052, 31054, 31055, 31059, 31060, 31061, 31062, 31064, 31065, 31067, 31069, 31071, 31072, 31075, 31077, 31079, 31082, 31083, 31084, 31085, 31086, 31088, 31089, 31090, 31091, 31093, 31095, 31096, 31098, 31099, 31120, 31197, 31198, 31199, 31201, 31202, 31203, 31204, 31205, 31206, 31207, 31208, 31209, 31210, 31211, 31212, 31213, 31216, 31217, 31220, 31221, 31294, 31295, 31296, 31297, 31301, 31302, 31304, 31305, 31307, 31308, 31309, 31310, 31312, 31313, 31314, 31315, 31316, 31318, 31319, 31320, 31321, 31322, 31323, 31324, 31326, 31327, 31328, 31329, 31331, 31333, 31401, 31402, 31403, 31404, 31405, 31406, 31407, 31408, 31409, 31410, 31411, 31412, 31414, 31415, 31416, 31418, 31419, 31420, 31421, 31501, 31502, 31503, 31510, 31512, 31513, 31515, 31516, 31518, 31519, 31520, 31521, 31522, 31523, 31524, 31525, 31527, 31532, 31533, 31534, 31535, 31537, 31539, 31542, 31543, 31544, 31545, 31546, 31547, 31548, 31549, 31550, 31551, 31552, 31553, 31554, 31555, 31556, 31557, 31558, 31560, 31561, 31562, 31563, 31564, 31565, 31566, 31567, 31568, 31569, 31598, 31599, 31622, 31623, 31624, 31630, 31631, 31634, 31635, 31639, 31641, 31642, 31645, 31648, 31649, 31650, 31699, 31727, 31733, 31749, 31750, 31760, 31769, 31774, 31783, 31798],
    "S": [30204, 30205, 30206, 30212, 30214, 30215, 30218, 30223, 30224, 30228, 30229, 30236, 30237, 30238, 30250, 30256, 30257, 30258, 30260, 30266, 30274, 30276, 30284, 30285, 30286, 30287, 30292, 30293, 30295, 30296, 30297, 30298, 30304, 30315, 30320, 30354, 30374, 30380, 30386, 30396, 30398, 31006, 31007, 31010, 31015, 31016, 31039, 31041, 31051, 31057, 31058, 31063, 31066, 31068, 31070, 31076, 31078, 31081, 31092, 31097, 31601, 31602, 31603, 31604, 31605, 31606, 31620, 31625, 31626, 31627, 31629, 31632, 31636, 31637, 31638, 31643, 31647, 31698, 31701, 31702, 31703, 31704, 31705, 31706, 31707, 31708, 31709, 31711, 31712, 31714, 31716, 31719, 31720, 31721, 31722, 31730, 31735, 31738, 31739, 31743, 31744, 31747, 31753, 31756, 31757, 31758, 31763, 31764, 31765, 31768, 31771, 31772, 31773, 31775, 31776, 31778, 31779, 31780, 31781, 31782, 31784, 31787, 31788, 31789, 31790, 31791, 31792, 31793, 31794, 31795, 31796, 31799, 31801, 31803, 31805, 31806, 31807, 31810, 31812, 31814, 31815, 31816, 31820, 31821, 31824, 31825, 31826, 31827, 31829, 31830, 31831, 31832, 31836, 31902, 31905, 31907, 31908, 31914, 31917, 31993, 31995, 31997, 31998, 31999],
    "SW": [30185, 30213, 30217, 30219, 30220, 30222, 30230, 30240, 30241, 30251, 30259, 30261, 30263, 30264, 30265, 30268, 30269, 30270, 30271, 30272, 30275, 30277, 30289, 30290, 30291, 30310, 30330, 30337, 30344, 30349, 30364, 31169, 31804, 31808, 31811, 31822, 31823, 31833, 31901, 31903, 31904, 31906, 31909],
    "W": [30106, 30108, 30109, 30110, 30111, 30112, 30113, 30116, 30117, 30118, 30119, 30122, 30124, 30125, 30126, 30127, 30132, 30133, 30134, 30135, 30138, 30140, 30141, 30150, 30153, 30154, 30157, 30168, 30170, 30176, 30179, 30180, 30182, 30187, 30311, 30314, 30331, 30336, 30358, 30362, 30368, 30371, 30377, 30378, 30385, 30388, 31106, 31107, 31119, 31126, 31131, 31136, 31139, 31141, 31145, 31146, 31150, 31156, 31192, 31193, 31195, 31196],
    "NW": [30006, 30007, 30008, 30060, 30061, 30063, 30064, 30065, 30066, 30069, 30080, 30081, 30082, 30090, 30101, 30102, 30103, 30104, 30105, 30120, 30121, 30123, 30129, 30137, 30139, 30144, 30145, 30147, 30149, 30152, 30156, 30160, 30161, 30162, 30163, 30165, 30171, 30172, 30173, 30178, 30184, 30189, 30303, 30313, 30318, 30325, 30334, 30339, 30369, 30384, 30701, 30703, 30707, 30710, 30719, 30720, 30721, 30722, 30725, 30726, 30728, 30730, 30731, 30733, 30734, 30735, 30736, 30738, 30739, 30740, 30741, 30742, 30746, 30747, 30750, 30752, 30753, 30755, 30756, 30757, 31144, 31191],
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
      // console.log("Exact match found for ZIP:", zipString);
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
      // console.log("Exact match found:", exactMatch.state);
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

    // Function to find direction by state
    function findDirectionByGaZip(zipcode) {
      for (const [direction, zipArray] of Object.entries(gazips)) {
        if (zipArray.includes(Number(zipcode))) {
          return direction;
        }
      }
      return null; // Return null if not foun
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

    // Ensure zipcode is always a number
    const numericZip = Number(zipcode);

    // Allow ZIP codes with 3, 4, or 5 digits
    if (!/^\d{3,5}$/.test(zipcode)) {
      displayMessage('Invalid ZIP code format. Enter a 3, 4, or 5-digit ZIP.');
      return;
    }

    // Check if ZIP exists (including loose matches)
    if (!checkZipcode(numericZip)) {  // Use numericZip for consistency
      displayMessage('Looks like that ZIP code does not exist, are you an ATLalien? Try Again');
      return;
    }

    // Find state based on ZIP
    const state = findStateByZip(numericZip); // Use numericZip
    console.log("Final determined state:", state);

    if (state === 'ZIP code not found') {
      displayMessage(state);
      return;
    }

    // Find direction based on the state
    const direction = findDirectionByState(state);
    console.log("Determined direction:", direction);
    const gaDirection = findDirectionByGaZip(numericZip); // Ensure numericZip is used

    if (checkAtl(numericZip)) { 
      setIsAtlanta(true);
      handleClickSendMessage( String(numericZip));
      navigate('/atlmap', { state: { zipcode: numericZip } }); 
    } else {
      setIsAtlanta(false);

      // Corrected check: Ensures numeric comparison
      const existsInGA = Object.values(gazips).some(zips => zips.includes(numericZip));

      if (existsInGA) {  
        console.log("GA direction MESSAGE:", gaDirection);
        handleClickSendMessage(gaDirection || "Unknown direction");
      } else {
        console.log("REG direction MESSAGE:", direction);
        handleClickSendMessage(direction || "Unknown direction");
      }

      navigate('/statemap', { state: { zipcode: numericZip } });
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