import React, { useEffect } from 'react';
import '../index.css';

const Graph = ({ zipcode }) => {
  const graph = {
    nodes: {
      "0": [1, 2, 3, 4, 5, 34],
      "1": [0, 2],
      "2": [0, 1, 11, 20, 21, 34, 36],
      "3": [0, 4, 10, 34],
      "4": [0, 3, 5, 7, 9, 10, 12],
      "5": [0, 4, 6, 7],
      "6": [5, 7, 8],
      "7": [4, 5, 6, 8, 9],
      "8": [6, 7, 9, 13],
      "9": [4, 7, 8, 12, 13],
      "10": [3, 4, 11, 12, 19, 34, 35],
      "11": [2, 10, 19, 23, 34, 36],
      "12": [4, 9, 10, 13, 15, 16, 35],
      "13": [8, 9, 12, 14, 15],
      "14": [13, 15, 17],
      "15": [12, 13, 14, 16, 17, 26],
      "16": [12, 15, 18, 25, 26, 35],
      "17": [14, 15, 26, 33],
      "18": [16, 19, 24, 25, 35],
      "19": [10, 11, 18, 23, 24, 35],
      "20": [2, 21, 22, 23, 29, 36],
      "21": [2, 20, 22],
      "22": [20, 21, 29],
      "23": [11, 19, 20, 24, 27, 28, 29, 36, 37],
      "24": [18, 19, 23, 25, 37],
      "25": [16, 18, 24, 26, 27, 32],
      "26": [15, 16, 17, 25, 32, 33],
      "27": [23, 25, 28, 31, 32, 37],
      "28": [23, 27, 29, 30, 31],
      "29": [20, 22, 23, 28, 30],
      "30": [28, 29],
      "31": [27, 28, 32],
      "32": [25, 26, 27, 31, 33],
      "33": [17, 26, 32],
      "34": [0, 2, 3, 10, 11],
      "35": [10, 12, 16, 18, 19],
      "36": [2, 11, 20, 23],
      "37": [23, 24, 27]
    }
  };

  const vertexList = {
    "0": { "x": 134, "y": 70 },
    "1": { "x": 32, "y": 131 },
    "2": { "x": 92, "y": 195 },
    "3": { "x": 201, "y": 152 },
    "4": { "x": 256, "y": 141 },
    "5": { "x": 240, "y": 69 },
    "6": { "x": 283, "y": 42 },
    "7": { "x": 285, "y": 92 },
    "8": { "x": 352, "y": 60 },
    "9": { "x": 329, "y": 134 },
    "10": { "x": 238, "y": 208 },
    "11": { "x": 162, "y": 244 },
    "12": { "x": 319, "y": 220 },
    "13": { "x": 443, "y": 144 },
    "14": { "x": 479, "y": 264 },
    "15": { "x": 392, "y": 278 },
    "16": { "x": 315, "y": 300 },
    "17": { "x": 427, "y": 340 },
    "18": { "x": 259, "y": 310 },
    "19": { "x": 217, "y": 272 },
    "20": { "x": 79, "y": 271 },
    "21": { "x": 37, "y": 233 },
    "22": { "x": 12, "y": 288 },
    "23": { "x": 141, "y": 327 },
    "24": { "x": 212, "y": 329 },
    "25": { "x": 265, "y": 376 },
    "26": { "x": 342, "y": 397 },
    "27": { "x": 195, "y": 396 },
    "28": { "x": 118, "y": 406 },
    "29": { "x": 57, "y": 342 },
    "30": { "x": 35, "y": 423 },
    "31": { "x": 153, "y": 466 },
    "32": { "x": 262, "y": 488 },
    "33": { "x": 376, "y": 463 },
    "34": { "x": 165, "y": 186 },
    "35": { "x": 269, "y": 268 },
    "36": { "x": 125, "y": 269 },
    "37": { "x": 192, "y": 353 }
  };

  const nodeProperties = {
    "Small Green": [3, 5, 6, 7, 17, 18, 19, 21, 22, 24, 31, 34, 35],
    "Medium Blue": [1, 4, 8, 9, 10, 11, 14, 16, 20, 25, 26, 27, 28, 29, 33],
    "Large Purple": [2, 12, 15, 23, 30],
    "Extra Large Red": [0, 13, 32],
    "Extra Small Yellow": [36, 37]
  };

  const nodeZipData = {
    "0": [30305, 30342, 30327],
    "1": [30339],
    "2": [30318],
    "3": [30324],
    "4": [30329],
    "5": [30326],
    "6": [30341],
    "7": [30319],
    "8": [30345],
    "9": [30033],
    "10": [30306],
    "11": [30309, 30363],
    "12": [30030],
    "13": [30084],
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
    "33": [30294],
  };
  
  let nodeSize = {};
  let nodeColors = {};
  let shortestPath = [];
  let bfsLevels = [];
  let pathIndex = 0;
  let levelIndex = 0;
  let animationStartTime;
  const shortestPathDuration = 1500;
  const bfsDuration = 3000;
  const clearDuration = 5000;
  let pathComplete = false;
  let bfsComplete = false;
  const nodeDivs = {};

  useEffect(() => {
    setup();
    if (zipcode) {
      const startNode = findNodeByZipcode(zipcode);
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
        size = 42;
      } else if (nodeProperties["Medium Blue"].includes(parseInt(key))) {
        size = 65;
      } else if (nodeProperties["Large Purple"].includes(parseInt(key))) {
        size = 90;
      } else if (nodeProperties["Extra Large Red"].includes(parseInt(key))) {
        size = 150;
      } else if (nodeProperties["Extra Small Yellow"].includes(parseInt(key))) {
        size = 15;
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

  const findNodeByZipcode = (zipcode) => {
    console.log("Zipcode:", zipcode);
    // Convert zipcode to number if it's a string
    const numericZipcode = typeof zipcode === 'string' ? Number(zipcode) : zipcode;
  
    for (let node in nodeZipData) {
      if (nodeZipData[node].includes(numericZipcode)) {
        return node; // Return the node key associated with the zipcode
      }
    }
    return null; // Return null if no node is found
  };
 

  const handleNodeClick = (startNode) => {
    shortestPath = [];
    bfsLevels = [];
    pathIndex = 0;
    levelIndex = 0;
    pathComplete = false;
    bfsComplete = false;

    let targetNode = "23"; // Set your target node here
    shortestPath = findShortestPath(startNode, targetNode);
    console.log("Shortest Path:", shortestPath);
    bfsLevels = getBFSLevels(targetNode);
    console.log("BFS Levels:", bfsLevels);

    animationStartTime = performance.now();
    requestAnimationFrame(animate);
  };

  const findShortestPath = (startNode, targetNode) => { 
    let visited = new Set();
    
    let queue = [[startNode]];
    while (queue.length > 0) {
        let path = queue.shift();
        let node = path[path.length - 1];

        console.log("Current path:", path);
        console.log(`Comparing node type: ${node} (type: ${typeof node}) with targetNode: ${targetNode} (type: ${typeof targetNode})`);

        if (node === targetNode) {
            console.log("Found path:", path);
            return path;
        }

        if (!visited.has(node)) {
            visited.add(node);
            const neighbors = graph.nodes[node] || [];
            neighbors.forEach((neighbor) => {
                let newPath = [...path, neighbor.toString()]; // Ensure neighbor is a string
                queue.push(newPath);
            });
        }
    }
    console.log("No path found");
    return [];
};


  const getBFSLevels = (startNode) => {
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

    if (elapsedTime > shortestPathDuration + bfsDuration + clearDuration) {
      return; // Stop the animation
    }

    updateNodeColors(elapsedTime);
    requestAnimationFrame(animate);
  };
  
  const updateNodeColors = (elapsedTime) => {
      if (!pathComplete) {
          let stepDuration = shortestPathDuration / shortestPath.length;
          if (pathIndex < shortestPath.length) {
              let node = shortestPath[pathIndex];
              if (elapsedTime >= stepDuration * (pathIndex + 1)) {
                  nodeColors[node] = 'radial-gradient(white var(--p), #009fdb)';
                  nodeDivs[node].style.background = nodeColors[node];
                  // nodeDivs[node].style.border = 'none';
                  triggerPulseAnimation(node);
                  pathIndex++;
              }
              if (pathIndex >= shortestPath.length) {
                  pathComplete = true;
              }
          }
      }

      if (pathComplete && !bfsComplete) {
          let stepDuration = bfsDuration / bfsLevels.length;
          let levelToUpdate = Math.floor((elapsedTime - shortestPathDuration) / stepDuration);

          if (levelToUpdate < bfsLevels.length) {
              let levelNodes = bfsLevels[levelToUpdate];
              colorNodesWithDelay(levelNodes, 800); // 80ms delay
          }

          if (levelToUpdate >= bfsLevels.length - 1) {
              bfsComplete = true;
              setTimeout(() => {
                resetNodeColors();
              }, 9000);
          }
      }
  };

// Function to color nodes with a delay
const colorNodesWithDelay = (levelNodes, delay) => {
    let currentIndex = 0;

    const colorNextNode = () => {
        if (currentIndex < levelNodes.length) {
            let node = levelNodes[currentIndex];
            // nodeColors[node] = 'radial-gradient(white var(--p), #009fdb)';
            nodeColors[node] = 'transparent'; // Set background to transparent
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
    }, 3000); // Duration of the pulse animation in milliseconds
  };

  return (
    <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
      <div id="graphContainer" style={{ position: 'relative', width: '500px', height: '350px' }}>
        <canvas 
          id="graphCanvas" 
          style={{ 
            position: 'absolute', 
            left: 0, 
            top: 0, 
            width: '500px', // Set explicit width
            height: '500px', // Set explicit height
            zIndex: 2
          }} 
        ></canvas>
      </div>
      {/* Other elements can go here */}
    </div>
  );
};

export default Graph;
