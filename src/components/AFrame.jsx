import React, { useEffect } from 'react';

const AFrameScene = () => {
  useEffect(() => {
    // Create a script element for A-Frame
    const script = document.createElement('script');
    script.src = 'https://aframe.io/releases/1.2.0/aframe.min.js';
    script.async = true;

    // Append the script to the document body
    document.body.appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <a-scene>
      <a-sky color="#2195CB"></a-sky>
      <a-camera position="0 0 3" user-height="0"></a-camera>
      <a-sphere
        src="https://raw.githubusercontent.com/aframevr/sample-assets/master/assets/images/space/earth_atmos_4096.jpg"
        radius="1.5"
        segments-height="53">
        <a-animation
          attribute="rotation"
          dur="50000"
          fill="forwards"
          to="0 360 0"
          easing="linear"
          repeat="indefinite"></a-animation>
      </a-sphere>
    </a-scene>
  );
};

export default AFrameScene;
