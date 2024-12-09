import React, { useEffect } from 'react';
import '../GraphAnimation.css';

const GraphAnimation = () => {
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
      size = 42;
      color = 'rgb(50, 158, 28)';
    } else if (nodeProperties["Medium Blue"].includes(parseInt(key))) {
      size = 65;
      color = 'rgb(0, 232, 255)';
    } else if (nodeProperties["Large Purple"].includes(parseInt(key))) {
      size = 90;
      color = 'rgb(232, 49, 255)';
    } else if (nodeProperties["Extra Large Red"].includes(parseInt(key))) {
      size = 150;
      color = 'rgb(255, 0, 70)';
    } else if (nodeProperties["Extra Small Yellow"].includes(parseInt(key))) {
      size = 15;
      color = 'rgb(227, 255, 0)';
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
