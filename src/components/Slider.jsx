// src/ColorSlider.js
import React, { useState } from 'react';

const ColorSlider = () => {
  // State for HSV values
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [value, setValue] = useState(100);

  // Function to convert HSV to RGB
  const hsvToRgb = (h, s, v) => {
    let r = 0, g = 0, b = 0;
    const i = Math.floor(h / 60);
    const f = h / 60 - i;
    const p = v * (1 - s / 100);
    const q = v * (1 - f * s / 100);
    const t = v * (1 - (1 - f) * s / 100);
    switch (i) {
      case 0: [r, g, b] = [v, t, p]; break;
      case 1: [r, g, b] = [q, v, p]; break;
      case 2: [r, g, b] = [p, v, t]; break;
      case 3: [r, g, b] = [p, q, v]; break;
      case 4: [r, g, b] = [t, p, v]; break;
      case 5: [r, g, b] = [v, p, q]; break;
      default: break;
    }
    return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
  };

  // Compute RGB color from HSV
  const color = hsvToRgb(hue, saturation, value);

  return (
    <div style={{ padding: '20px' }}>
      <div>
        <label>Hue: {hue}</label>
        <input
          type="range"
          min={0}
          max={360}
          value={hue}
          onChange={(e) => setHue(Number(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>
      <div>
        <label>Saturation: {saturation}</label>
        <input
          type="range"
          min={0}
          max={100}
          value={saturation}
          onChange={(e) => setSaturation(Number(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>
      <div>
        <label>Value: {value}</label>
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>
      <div style={{ marginTop: '20px', width: '100px', height: '100px', backgroundColor: color }} />
    </div>
  );
};

export default ColorSlider;
