import React, { useEffect } from 'react';

const AFrameScene = () => {

  return (
     <a-scene style={{ width: '80vw', height: '60vh', margin: '0 auto' }}>
      <a-sky color="#2195CB"></a-sky> {/* Use a solid color for the sky */}
      <a-camera position="0 0 3" user-height="0"></a-camera>
      <a-sphere
        src="https://raw.githubusercontent.com/aframevr/sample-assets/master/assets/images/space/earth_atmos_4096.jpg"
        radius="1"
        segments-height="53"
        material="transparent: true; opacity: 0.8"> {/* Set transparency with opacity */}
        <a-animation
          attribute="rotation"
          dur="5000"
          fill="forwards"
          to="0 360 0"
          easing="linear"
          repeat="indefinite"></a-animation>
      </a-sphere>
    </a-scene>
  );
};

export default AFrameScene;
