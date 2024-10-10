import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
 import useWebSockets from '../useWebSocket';
import Footer from './Footer';


const Admin = () => {
  const defaultMode = 'Mode 1';
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
  const [selectedMode, setSelectedMode] = useState(localStorage.getItem('selectedMode') || defaultMode);
  const navigate = useNavigate();
  const { handleClickSendMode } = useWebSockets('wss://lw-server-ce19694e9edf.herokuapp.com/'); // Update with your WebSocket URL

  useEffect(() => {
    const handleNewMessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'UPDATE_MODE') {
        setSelectedMode(data.mode);
        localStorage.setItem('selectedMode', data.mode);
      }
    };

    const ws = new WebSocket('wss://lw-server-ce19694e9edf.herokuapp.com/'); // Update with your WebSocket URL
    ws.onmessage = handleNewMessage;

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

  if (!isAuthenticated) {
    return (
      <div className="Admin">
        <h2>Admin Page</h2>
        <p>Login</p>
        <form onSubmit={(e) => {
          e.preventDefault();
          // Simulate login check
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
            <input name="username" placeholder="Username" type="text" required />
          </div>
          <br></br>
          <div>
            <input name="password" placeholder="Password" type="password" required />
          </div>
          <br></br>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="Admin">
      <h1>Admin Dashboard</h1>
      <div>
        <button onClick={() => setSelectedMode('Mode 1')}>Mode 1</button>
        <button onClick={() => setSelectedMode('Mode 2')}>Mode 2</button>
        <button onClick={() => setSelectedMode('Mode 3')}>Mode 3</button>
      </div>
      <p>Selected Mode: {selectedMode}</p>
      <button onClick={handleLogout}>Logout</button>
      <Footer />
    </div>
  );
};

export default Admin;
