import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../att-logo.png';
// import '../App.css';

function Proceed() {
    return (
      <div className="Proceed">
        <h1>THE AT&T PERCH LIVING MURAL</h1>
        <br></br>
        <p>What is your zipcode?</p>
      
        <br></br>
        <br></br>
        <br></br>
        <Link to='/international'>
          <button>International Visitors</button>
        </Link>
        <br></br>
        <br></br>
        <Link to='/zipcode'>
          <button>National Visitors</button>
        </Link>
        <br></br>
        <br></br>
        <img src={logo} className="logo" alt="Logo" />
        <br></br>
        <br></br>
      </div>
    );
  }
  
  export default Proceed;
