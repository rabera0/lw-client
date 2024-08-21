import React from 'react';
import logo from '../att-logo.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 import useWebSockets from '../useWebSocket';
//import { Link } from 'react-router-dom';
// import '../App.css';


const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
  const [selectedMode, setSelectedMode] = useState('');
  const navigate = useNavigate();
   const { messageHistory, connectionStatus, handleClickChangeSocketUrl, handleClickSendMode } = useWebSockets('wss://lofty-tar-author.glitch.me/');
 
  const handleSubmit = (event) => {
    event.preventDefault();
    //help here for sending mode 1,2 or 3 through sockets
    handleClickSendMode(mode);
  };
  
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
    </div>
  );
};

export default Admin;
