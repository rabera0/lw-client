import React from 'react';
//import { Link } from 'react-router-dom';
// import '../App.css';
import logo from '../att-logo.png';

function IntlMap() {
    return (
      <div className="International">
        <h1>THE AT&T PERCH LIVING MURAL</h1>
        <h2> Welcome to America! </h2>
        <br></br>
        <br></br>
        <br></br>
        <Graph zipcode={30303} />
        <br></br>  
        <br></br>
        <br></br>
        <img src={logo} className="logo" alt="Logo" />
        <br></br>
        <br></br>  
      </div>
    );
  }
  
  export default IntlMap;