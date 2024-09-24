import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../att-logo.png';
// import '../App.css';

function Landing() {
    return (
      <div className="Landing">
        <h1>THE AT&T PERCH LIVING MURAL</h1>
        <br></br>
        <br></br>
        <p>At AT&T, our purpose is to connect people 
        to greater possibility. In service of this mindset, 
        this artwork represetns a cultural
        touchpoint that bridges Mercedes Benz
        Stadium and the Metropolitan Atlanta. </p>
        <br></br>
        <br></br>
        <p>The mural is an interactive map showing
        different neighborhoods of Metro Atlanta.</p>
        <br></br>
        <br></br>
        <img src={logo} className="logo" alt="Logo" />
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <p>*No data is collected from this installation*</p>
        <br></br>
        <Link to='/proceed'>
          <button>Proceed</button>
        </Link>
      </div>
    );
  }
  
  export default Landing;

