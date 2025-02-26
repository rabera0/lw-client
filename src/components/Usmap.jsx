import React from "react"; 
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import usStatesGeoJson from "../data/state.json";

// Mapping of state abbreviations to full names
const stateAbbreviations = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
  CO: "Colorado", CT: "Connecticut", DE: "Delaware", FL: "Florida", GA: "Georgia",
  HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa",
  KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland",
  MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi", MO: "Missouri",
  MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire", NJ: "New Jersey",
  NM: "New Mexico", NY: "New York", NC: "North Carolina", ND: "North Dakota",
  OH: "Ohio", OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island",
  SC: "South Carolina", SD: "South Dakota", TN: "Tennessee", TX: "Texas", UT: "Utah",
  VT: "Vermont", VA: "Virginia", WA: "Washington", WV: "West Virginia",
  WI: "Wisconsin", WY: "Wyoming",
};

const Usmap = ({ highlightedState }) => {
  // Convert the abbreviation to full name
  const highlightedStateFullName = stateAbbreviations[highlightedState] || null;

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ComposableMap
        projection="geoAlbersUsa"
        style={{
          width: "100%",
          height: "auto",
          maxWidth: "100%",
        }}
      >
        <Geographies geography={usStatesGeoJson}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const stateName = geo.properties.NAME;
              const isHighlighted = stateName === highlightedStateFullName || stateName === "Georgia";

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isHighlighted ? "rgba(255, 255, 255, 0.3)" : "none"}
                  stroke="white"
                  strokeWidth={0.5}
                  style={{
                    default: {
                      fill: isHighlighted ? "rgba(255, 255, 255, 0.3)" : "none",
                      stroke: "white",
                      strokeWidth: 0.5,
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default Usmap;
