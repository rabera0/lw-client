const WebSocket = require('ws');

const PORT = 5000;

const wsServer = new WebSocket.Server({ port: PORT });

wsServer.on('connection', function (socket) {
  // Feedback on console
  console.log('A client just connected');

  // Attach behavior to incoming socket messages
  socket.on('message', function (msg) {
    console.log('Received message from client: ' + msg);

    // Broadcast message to all connected clients
    wsServer.clients.forEach(function (client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send('Someone said: ' + msg);
      }
    });
  });
});

console.log(new Date() + ' Server is hosted on port ' + PORT);
