const WebSocket = require('ws');

const serverAddress = 'wss://pinnate-uttermost-fiber.glitch.me/';

const ws = new WebSocket(serverAddress);

ws.on('open', function() {
  ws.send("Hello server!");
});

ws.on('message',function(msg) {
  console.log("Recieved msg from the server: " + msg);
});