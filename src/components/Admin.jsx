import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer'; // Assuming you have a Footer component

const Admin = () => {
  const defaultMode = 'Mode 1';
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
  const [selectedMode, setSelectedMode] = useState(localStorage.getItem('selectedMode') || defaultMode);
  const [isTouchDesignerConnected, setIsTouchDesignerConnected] = useState(false);
  const navigate = useNavigate();

  // Store WebSocket instance in useRef to avoid reopening it every time
  const wsRef = useRef(null);

  useEffect(() => {
    // Check if WebSocket is already created
    if (!wsRef.current) {
      // Only create WebSocket once
      wsRef.current = new WebSocket('wss://lw-server-ce19694e9edf.herokuapp.com/'); // Update with your WebSocket URL
  
      const handleNewMessage = (event) => {
        try {
          const data = JSON.parse(event.data); // Parse the incoming message to an object
          console.log('Received message:', data); // Log received messages to check structure
  
          // Check if the message contains the 'text' field and parse it further
          if (data.text) {
            const parsedMessage = JSON.parse(data.text);
  
            if (parsedMessage.type === 'TOUCHDESIGNER_CONNECTED') {
              setIsTouchDesignerConnected(true);
            }
  
            if (parsedMessage.type === 'TOUCHDESIGNER_DISCONNECTED') {
              setIsTouchDesignerConnected(false);
            }
          }
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      };
  
      wsRef.current.onmessage = handleNewMessage;
  
      wsRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
  
      wsRef.current.onclose = () => {
        console.log('WebSocket connection closed');
        setIsTouchDesignerConnected(false);
      };
    }
  
    return () => {
      // Close WebSocket connection on cleanup
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);
  

  const handleLogin = () => {
    if (localStorage.getItem('isAuthenticated') === 'true') {
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    navigate('/admin');
  };

  const sendMode = (mode) => {
    // Send mode change through WebSocket if the connection is open
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ selectedMode: mode }));
    } else {
      console.error('WebSocket is not open');
    }
  };

  // Log current state to verify it's updating correctly
  console.log('isTouchDesignerConnected:', isTouchDesignerConnected);

  if (!isAuthenticated) {
    return (
      <div className="Admin">
        <h2>Admin Page</h2>
        <form id="adminForm" onSubmit={(e) => {
          e.preventDefault();
          const username = e.target.username.value;
          const password = e.target.password.value;
          if (username === 'admin' && password === 'admin') {
            localStorage.setItem('isAuthenticated', 'true');
            setIsAuthenticated(true);
            navigate('/admin');
          } else {
            alert('Invalid credentials');
          }
        }}>
          <p>Login</p>
          <input name="username" placeholder="Username" type="text" required />
          <input name="password" placeholder="Password" type="password" required />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="Admin">
      <h1>Admin Dashboard</h1>
      <br/>
      <p><strong>TouchDesigner Status:</strong> 
        <span style={{ color: isTouchDesignerConnected ? 'green' : 'red', fontWeight: 'bold' }}>
          {isTouchDesignerConnected ? ' Connected' : ' Disconnected'}
        </span>
      </p>
      <br/>
      <p>Selected Mode: {selectedMode}</p>
      <div id="modes">
        <button onClick={() => { setSelectedMode('Mode 1'); sendMode('Mode 1'); }}>AT&T</button>
        <button onClick={() => { setSelectedMode('Mode 2'); sendMode('Mode 2'); }}>Soccer</button>
        <button onClick={() => { setSelectedMode('Mode 3'); sendMode('Mode 3'); }}>Concert</button>
      </div>
      <button onClick={handleLogout}>Logout</button>
      <Footer />
    </div>
  );
};

export default Admin;
