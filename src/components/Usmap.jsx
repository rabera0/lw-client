import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import usStatesGeoJson from '../data/state.json';
const Usmap = () => {
  const geoUrl = usStatesGeoJson;

  return (
    <ComposableMap>
     {/* <svg viewBox="10 10 250 250" class="rsm-svg "><g class="rsm-geographies "> */}
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="#EEE" // Fill color for each state
              stroke="#333" // Outline color for each state
              strokeWidth={0} // Stroke width
              style={{
                default: {
                  fill: "#EEE", // Default fill color
                  outline: "none",
                },
                hover: {
                  fill: "#F53", // Fill color on hover
                  transition: "all 250ms",
                  outline: "none",
                },
                pressed: {
                  fill: "#E42", // Fill color on click
                  outline: "none",
                },
              }}
            />
          ))
        }
      </Geographies>
    </ComposableMap>
  );
};

export default Usmap;