import React from 'react';
import logo from '../att-logo.png';
import useWebSocket from '../useWebSocket';
//import { Link } from 'react-router-dom';
// import '../App.css';

function Admin() {
  const { message } = useWebSocket('wss://pinnate-uttermost-fiber.glitch.me/');
    return (
      <div className="Admin">
        <h2>Control Panel</h2>
        <br></br>
        <br></br>
         {message && <p>Received from server: {message}</p>}
        <br></br>
        <br></br>    
      </div>
    );
  }
  
  export default Admin;