import React from 'react';
import logo from '../att-logo.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 import useWebSocket from '../useWebSocket';
//import { Link } from 'react-router-dom';
// import '../App.css';


const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
  const [selectedMode, setSelectedMode] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (localStorage.getItem('isAuthenticated') === 'true') {
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    navigate('/');
  };

  if (!isAuthenticated) {
    return (
      <div>
        <h2>Admin Page</h2>
        <h2>Login</h2>
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
          <div>
            <input name="password" placeholder="Password" type="password" required />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
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
