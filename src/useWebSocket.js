// src/hooks/useWebSocket.js
import { useState, useEffect } from "react";

const useWebSocket = (url) => {
  const [ws, setWs] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onopen = () => {
      console.log("WebSocket connection established");
      socket.send("Hello server!");
    };

    socket.onmessage = (event) => {
      console.log("Received message from server:", event.data);
      setMessage(event.data);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    setWs(socket);

    return () => {
      if (socket.readyState === 1) {
        // <-- This is important
        socket.close();
      }
    };
  }, [url]);

  return { ws, message };
};

export default useWebSocket;
