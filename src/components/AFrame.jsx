import React from 'react';

const AFrameScene = () => {
  return (
    <a-scene
      embedded
      vr-mode-ui="enabled: false" // Disable VR button
      style={{ height: '60vh', margin: '0 auto' }} // Adjust margin as needed
    >
      <a-sky color="#2195CB"></a-sky>
      <a-camera position="0 0 3" user-height="0"></a-camera>
      <a-sphere
        src="https://raw.githubusercontent.com/aframevr/sample-assets/master/assets/images/space/earth_atmos_4096.jpg"
        radius="1"
        segments-height="35"
        position="0 0 0.7"
        material="transparent: true; opacity: 0.8"
        animation="property: rotation; to: 0 360 0; dur: 5000; easing: linear; loop: true"
      ></a-sphere>
    </a-scene>
  );
};

export default AFrameScene;
