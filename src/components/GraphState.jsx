import React, { useEffect } from 'react';
import '../index.css';
import uszips from '../data/USCities.json';
const img = "https://cdn.glitch.global/f45e1b7b-5bbc-4ef0-82cf-33f60ccdb1c4/usOutline.png?v=1727804021010"

const GraphState = ({ zipcode }) => {
  const graph = {
    nodes: {
      "0": [2, 3, 4, 5, 7, 21],
      "1": [],
      "2": [0, 3, 11, 20, 21],
      "3": [0, 2, 4, 5, 11],
      "4": [3, 5, 8, 10, 11],
      "5": [3, 4, 7, 8, 9],
      "6": [8, 9, 13],
      "7": [5, 8],
      "8": [5, 6, 7, 9],
      "9": [4, 6, 8, 10, 13],
      "10": [3, 4, 11, 12, 34, 35],
      "11": [2, 3, 4, 10, 18, 20],
      "12": [13, 14, 15, 16, 17],
      "13": [6, 9, 10, 12, 14, 16],
      "14": [12, 13, 15],
      "15": [12, 14, 17],
      "16": [12, 17, 18, 25, 26, 35],
      "17": [12, 14, 34, 36],
      "18": [10, 11, 16, 19, 24, 25],
      "19": [11, 18, 23, 24],
      "20": [2, 11, 19, 21, 22, 23],
      "21": [0, 20, 22],
      "22": [20, 21, 23, 29],
      "23": [19, 20, 22, 24, 27, 28, 29],
      "24": [18, 19, 23, 25, 27],
      "25": [16, 18, 24, 26, 27, 34],
      "26": [25, 27, 33, 32, 35],
      "27": [23, 24, 25, 26, 28, 32, 33],
      "28": [23, 27, 29, 30, 31, 32],
      "29": [22, 23, 28, 30],
      "30": [28, 29, 31],
      "31": [28, 30, 32],
      "32": [27, 28, 31, 33],
      "33": [26, 32, 35],
      "34": [16, 17, 25, 26, 35],
      "35": [17, 26, 33, 34, 36],
      "36": [17, 35]
    }
  };

  const vertexList = {
    "0": { "x": 133, "y": 91 },
    "1": { "x": 791, "y": 775 },
    "2": { "x": 170, "y": 171 },
    "3": { "x": 205, "y": 148 },
    "4": { "x": 248, "y": 155 },
    "5": { "x": 226, "y": 107 },
    "6": { "x": 327, "y": 79 },
    "7": { "x": 225, "y": 65 },
    "8": { "x": 263, "y": 85 },
    "9": { "x": 294, "y": 129 },
    "10": { "x": 294, "y": 199 },
    "11": { "x": 218, "y": 198 },
    "12": { "x": 376, "y": 246 },
    "13": { "x": 395, "y": 150 },
    "14": { "x": 430, "y": 233 },
    "15": { "x": 437, "y": 275 },
    "16": { "x": 313, "y": 269 },
    "17": { "x": 386, "y": 313 },
    "18": { "x": 257, "y": 249 },
    "19": { "x": 210, "y": 250 },
    "20": { "x": 150, "y": 217 },
    "21": { "x": 75, "y": 185 },
    "22": { "x": 84, "y": 252 },
    "23": { "x": 154, "y": 284 },
    "24": { "x": 221, "y": 290 },
    "25": { "x": 266, "y": 293 },
    "26": { "x": 275, "y": 344 },
    "27": { "x": 202, "y": 339 },
    "28": { "x": 133, "y": 351 },
    "29": { "x": 95, "y": 302 },
    "30": { "x": 66, "y": 350 },
    "31": { "x": 94, "y": 404 },
    "32": { "x": 166, "y": 404 },
    "33": { "x": 275, "y": 405 },
    "34": { "x": 321, "y": 321 },
    "35": { "x": 346, "y": 387 },
    "36": { "x": 419, "y": 374 }
  };
  

  const nodeProperties = {
    "Small Green": [2, 3, 4, 5, 7, 8, 14, 15, 18, 19, 24, 25, 29, 34],
    "Medium Blue": [6, 9, 11, 12, 16, 20, 22, 26, 27, 28, 30, 31, 32, 33, 36],
    "Large Purple": [10, 17, 21, 23, 35],
    "Extra Large Red": [0, 13]
  };

  const nodeZipData = {
    "0": [30305, 30342, 30327, 30339, 30328, 30067],
    "1": [],
    "2": [30318],
    "3": [30324],
    "4": [30329],
    "5": [30326],
    "6": [30341, 30360, 30338, 30360],
    "7": [30319, 30346],
    "8": [30345],
    "9": [30033],
    "10": [30306],
    "11": [30309, 30363],
    "12": [30030],
    "13": [30084, 30340],
    "14": [30079, 30002],
    "15": [30032],
    "16": [30317],
    "17": [30034],
    "18": [30307],
    "19": [30308],
    "20": [30314],
    "21": [30216],
    "22": [30331],
    "23": [30303],
    "24": [30313],
    "25": [30316],
    "26": [30288],
    "27": [30315],
    "28": [30310],
    "29": [30311],
    "30": [30344],
    "31": [30337],
    "32": [30354],
    "33": [30294]
  };
  
  
  const directionNode = {
    "N":"7",
    "S":"33",
    "E":"14",
    "W":"14",
    "NW":"0",
    "NE":"13",
    "SW":"31",
    "SE":"17"
  }
  
  const stateDirection = {
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
  
  let nodeSize = {};
  let nodeColors = {};
  let shortestPath = [];
  let bfsLevels = [];
  let pathIndex = 0;
  let levelIndex = 0;
  let animationStartTime;
  const shortestPathDuration = 1500;
  const bfsDuration = 3000;
  const clearDuration = 3000;
  let pathComplete = false;
  let bfsComplete = false;
  const nodeDivs = {};

  function findStateByZip(zipCode) {
    const numericZipCode = Number(zipCode);
    const result = uszips.find(entry => entry.zip_code === numericZipCode);
    return result ? result.state : 'ZIP code not found';
  }

  // Function to find direction by state
  function findDirectionByState(state) {
    console.log("state: " + state)
    return stateDirection[state] || null; // Return null if state not found
  }

  // Function to find node by direction
  function findNodeByDirection(direction) {
    console.log("direction: " + direction)
    return directionNode[direction] || null; // Return null if direction not found
  }
  
  const state = zipcode ? findStateByZip(zipcode) : null;
  const direction = state ? findDirectionByState(state) : null;
  const startNode = direction ? findNodeByDirection(direction) : '23'
  console.log("start node: " + startNode)
  
  
  useEffect(() => {
    setup();
    if (zipcode) {
      if (startNode !== null) {
        handleNodeClick(startNode);
      }
    }
  }, [zipcode]);
  
  // Setup function
  const setup = () => {
    const container = document.getElementById('graphContainer');
  
    // Create nodes
    for (let key in vertexList) {
      let size = 20;
      let color = 'rgb(200, 200, 200, 0)';
  
      // Determine size
      if (nodeProperties["Small Green"].includes(parseInt(key))) {
        size = 40;
      } else if (nodeProperties["Medium Blue"].includes(parseInt(key))) {
        size = 56;
      } else if (nodeProperties["Large Purple"].includes(parseInt(key))) {
        size = 74;
      } else if (nodeProperties["Extra Large Red"].includes(parseInt(key))) {
        size = 134;
      } 
  
      nodeSize[key] = size;
      nodeColors[key] = color;
  
      const nodeDiv = document.createElement('div');
      nodeDiv.className = 'box';
      nodeDiv.style.position = 'absolute';
      nodeDiv.style.left = `${vertexList[key].x - size / 2}px`;
      nodeDiv.style.top = `${vertexList[key].y - size / 2}px`;
      nodeDiv.style.width = `${size}px`;
      nodeDiv.style.height = `${size}px`;
      // nodeDiv.style.backgroundColor = nodeColors[key];
      nodeDiv.style.backgroundColor = 'transparent';
      nodeDiv.style.border = '2px solid rgb(255, 255, 255)'; // White border
      nodeDiv.style.borderRadius = '50%';
      nodeDiv.style.transition = 'background 0.5s ease';
      
      container.appendChild(nodeDiv);
      nodeDivs[key] = nodeDiv;
    }
  
    // Setup canvas size and scale
    const canvas = document.getElementById('graphCanvas');
    canvas.width = 500; // Set canvas width
    canvas.height = 500; // Set canvas height
    const ctx = canvas.getContext('2d');
  };
 

  const handleNodeClick = (startNode) => {
    shortestPath = [];
    bfsLevels = [];
    pathIndex = 0;
    levelIndex = 0;
    pathComplete = false;
    bfsComplete = false;

    let targetNode = "23"; // Set your target node here
    shortestPath = findShortestPath(startNode);
    // bfsLevels = getBFSLevels(targetNode);
  //  bfsLevels = getBFSLevels(targetNode);

    animationStartTime = performance.now();
    requestAnimationFrame(animate);
  };
  
    const findShortestPath = (startNode) => { 
      let levels = [];
        let visited = new Set();
        let queue = [[startNode]];

        while (queue.length > 0) {
          let level = queue.shift();
          levels.push(level);
          let nextLevel = [];

          level.forEach((node) => {
            if (!visited.has(node)) {
              visited.add(node);
              nextLevel.push(...graph.nodes[node].filter((neighbor) => !visited.has(neighbor)));
            }
          });

          if (nextLevel.length > 0) {
            queue.push(nextLevel);
          }
        }
        return levels;
};
  

  const animate = () => {
    const elapsedTime = performance.now() - animationStartTime;

    if (elapsedTime > bfsDuration + clearDuration) {
      return; // Stop the animation
    }

    updateNodeColors(elapsedTime);
    requestAnimationFrame(animate);
  };
  
  const updateNodeColors = (elapsedTime) => {
      if (!pathComplete) {
          let stepDuration = shortestPathDuration / shortestPath.length;

          let levelToUpdate = Math.floor((elapsedTime) / stepDuration);
        
          if (levelToUpdate < shortestPath.length) {
              let levelNodes = shortestPath[levelToUpdate];
              colorNodesWithDelay(levelNodes, 200); // 80ms delay
          }

          if (levelToUpdate >= shortestPath.length) {
              setTimeout(() => {
                  pathComplete = true;
                //  resetNodeColors();
              }, 3000);
          }
      }
  };

// Function to color nodes with a delay
const colorNodesWithDelay = (levelNodes, delay) => {
    let currentIndex = 0;

    const colorNextNode = () => {
        if (currentIndex < levelNodes.length) {
            let node = levelNodes[currentIndex];
            nodeColors[node] = 'radial-gradient(white var(--p), #009fdb)';
            nodeDivs[node].style.background = nodeColors[node];
            // nodeDivs[node].style.border = 'none'; // Remove the border
            triggerPulseAnimation(node);
            currentIndex++;
            setTimeout(colorNextNode, delay); // Call the next node coloring after a delay
        }
    };

    colorNextNode(); // Start the coloring process
};

  const resetNodeColors = () => {
    for (let key in nodeDivs) {
      nodeDivs[key].style.background = 'rgba(255, 255, 255, 0)'; // Reset to transparent
        nodeDivs[key].style.border = '2px solid rgb(255, 255, 255)'; // Restore the border
    }
  };

  const triggerPulseAnimation = (node) => {
    const nodeDiv = nodeDivs[node];
    nodeDiv.classList.add('pulse');
    setTimeout(() => {
      nodeDiv.classList.remove('pulse');
    }, 2000); // Duration of the pulse animation in milliseconds
  };

  return (
    <div 
      style={{ 
        width: '100%', 
        maxWidth: '500px', 
        margin: '0 auto'
      }}
    >
      <div id="graphContainer" style={{ position: 'relative', width: '500px', height: '350px' }}>
        <canvas 
          id="graphCanvas" 
          style={{ 
            position: 'absolute', 
            left: 0, 
            top: 0, 
            width: '500px', // Set explicit width
            height: '350px', // Match the height of the container
            zIndex: 2
          }} 
        ></canvas>
      </div>
    </div>
  );  
};

export default GraphState;
