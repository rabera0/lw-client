const WebSocket = require("ws");

const PORT = 5000;

const wsServer = new WebSocket.Server({
  port: PORT,
});

wsServer.on("connection", function (socket) {
  // feedback on console
  console.log("a client just connected");

  //attach behavior to incoming socket
  socket.on("message", function (msg) {
    console.log("Recieved message from client: " + msg);
    //socket.send("Take this back: " + msg);

    //broadcast message to all connected clients
    wsServer.clinets.forEach(function (client) {
      client.send("someone said: " + msg);
    });
  });
});

console.log(new Date() + "Server is hosted on port " + PORT);
