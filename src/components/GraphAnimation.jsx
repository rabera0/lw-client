import React, { useEffect } from 'react';
import '../GraphAnimation.css';

const GraphAnimation = () => {
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
    "1": { "x": 491, "y": 475 },
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

  let nodeSize = {};
  let nodeColors = {};
  let originalColors = {};
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

  useEffect(() => {
    setup();
  }, []);

// Setup function
const setup = () => {
  const container = document.getElementById('graphAniContainer');
  const canvas = document.getElementById('graphAniCanvas');
  const ctx = canvas.getContext('2d');

  // Set canvas size to match the container
  canvas.width = container.offsetWidth;
  canvas.height = container.offsetHeight;

  // Draw edges and nodes
  drawEdges(ctx);

  // Add event listener for resizing the window
  window.addEventListener('resize', () => {
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    drawEdges(ctx); // Redraw edges after resizing
  });

  // Render node divs
  for (let key in vertexList) {
    let size = 20;
    let color = 'rgb(200, 200, 200)';

    // Determine size and color
    if (nodeProperties["Small Green"].includes(parseInt(key))) {
      size = 40;
      color = 'rgb(50, 158, 28)';
    } else if (nodeProperties["Medium Blue"].includes(parseInt(key))) {
      size = 56;
      color = 'rgb(0, 232, 255)';
    } else if (nodeProperties["Large Purple"].includes(parseInt(key))) {
      size = 74;
      color = 'rgb(232, 49, 255)';
    } else if (nodeProperties["Extra Large Red"].includes(parseInt(key))) {
      size = 134;
      color = 'rgb(255, 0, 70)';
    }

    nodeSize[key] = size;
    nodeColors[key] = color;
    originalColors[key] = color;

    const nodeDiv = document.createElement('div');
    nodeDiv.className = 'box';
    nodeDiv.style.position = 'absolute';
    nodeDiv.style.left = `${vertexList[key].x - size / 2}px`;
    nodeDiv.style.top = `${vertexList[key].y - size / 2}px`;
    nodeDiv.style.width = `${size}px`;
    nodeDiv.style.height = `${size}px`;
    nodeDiv.style.background = color;
    nodeDiv.style.borderRadius = '50%';
    nodeDiv.style.transition = 'background 0.5s ease';
    container.appendChild(nodeDiv);
    nodeDivs[key] = nodeDiv;
  }

  // Add click event listener to canvas
  canvas.addEventListener('mousedown', (event) => {
    console.log('Canvas clicked!');
    for (let key in vertexList) {
      const pos = vertexList[key];
      const d = Math.sqrt(Math.pow(event.offsetX - pos.x, 2) + Math.pow(event.offsetY - pos.y, 2));
      if (d < nodeSize[key] / 2) {
        handleNodeClick(key);
        console.log(key);
        break;
      }
    }
  });
};


  document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('graphAniCanvas');
    console.log(canvas);
  });
  

  const drawEdges = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.lineWidth = 3;

    for (let key in graph.nodes) {
      const start = vertexList[key];

      graph.nodes[key].forEach((neighbor) => {
        const end = vertexList[neighbor];
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.25)';
        ctx.stroke();
      });
    }
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

        // console.log("Current path:", path);
        // console.log(`Comparing node type: ${node} (type: ${typeof node}) with targetNode: ${targetNode} (type: ${typeof targetNode})`);

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
        for (let node of levelNodes) {
          nodeColors[node] = 'radial-gradient(white var(--p), #009fdb)';
          nodeDivs[node].style.background = nodeColors[node];
          triggerPulseAnimation(node);
        }
      }

      if (levelToUpdate >= bfsLevels.length - 1) {
        bfsComplete = true;
        setTimeout(() => {
          resetNodeColors();
        }, 3000);
      }
    }
  };

  const resetNodeColors = () => {
    for (let key in nodeDivs) {
      nodeDivs[key].style.background = originalColors[key];
    }
  };

  const triggerPulseAnimation = (node) => {
    const nodeDiv = nodeDivs[node];
    nodeDiv.classList.add('pulse-animation');
    setTimeout(() => {
      nodeDiv.classList.remove('pulse-animation');
    }, 1000); // Duration of the pulse animation in milliseconds
  };

  return (
    <div id="graphAniContainer">
      <canvas id="graphAniCanvas" style={{ top: 0, left: 0 }}></canvas>
    </div>
  );
};

export default GraphAnimation;
