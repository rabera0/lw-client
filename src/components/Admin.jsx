import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer'; // Assuming you have a Footer component

const Admin = () => {
  const defaultMode = 'Mode 1';
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
  const [selectedMode, setSelectedMode] = useState(localStorage.getItem('selectedMode') || defaultMode);
  const navigate = useNavigate();

  useEffect(() => {
    const ws = new WebSocket('wss://lw-server-ce19694e9edf.herokuapp.com/'); // Update with your WebSocket URL

    const handleNewMessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Received message:', data); // Log received messages
      if (data.type === 'UPDATE_MODE') {
        setSelectedMode(data.mode);
        localStorage.setItem('selectedMode', data.mode);
      }
    };

    ws.onmessage = handleNewMessage;

    // Optional: Handle errors and connection close
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
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
    const ws = new WebSocket('wss://lw-server-ce19694e9edf.herokuapp.com/'); // Make sure to handle this properly
    ws.onopen = () => {
      ws.send(JSON.stringify({ selectedMode: mode }));
    };
  };

  if (!isAuthenticated) {
    return (
      <div className="Admin">
        <h2>Admin Page</h2>
        <form id = "adminForm" onSubmit={(e) => {
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
          <div>
          <p>Login</p>
          <br />
          <br />
            <input name="username" placeholder="Username" type="text" required />
          </div>
          <div>
            <input name="password" placeholder="Password" type="password" required />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="Admin">
      <h1>Admin Dashboard</h1>
      <br />
      <br />
      <p>Selected Mode: {selectedMode}</p>
      <div id="modes">
        <button onClick={() => { setSelectedMode('Mode 1'); sendMode('Mode 1'); }}>Mode 1</button>
        <button onClick={() => { setSelectedMode('Mode 2'); sendMode('Mode 2'); }}>Mode 2</button>
        <button onClick={() => { setSelectedMode('Mode 3'); sendMode('Mode 3'); }}>Mode 3</button>
      </div>
      <button onClick={handleLogout}>Logout</button>
      <Footer />
    </div>
  );
};

export default Admin;
