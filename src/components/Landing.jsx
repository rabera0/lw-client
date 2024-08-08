import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../att-logo.png';
// import '../App.css';

function Landing() {
    return (
      <div className="Landing">
        <h1>THE AT&T PERCH LIVING MURAL</h1>
        <p>At AT&T, our purpose is to connect people 
        to greater possibility. In service of this mindset, 
        this artwork represetns a cultural
        touchpoint that bridges Mercedes Benz
        Stadium and the Metropolitan Atlanta. </p>
        <p>The mural is an interactive map showing
        different neighborhoods of Metro Atlanta.</p>
        <br></br>
        <br></br>
        <img src={logo} className="logo" alt="Logo" />
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

//   {/*
//   <header className="App-header">
//     <img src={logo} className="App-logo" alt="logo" />
//   <p>
//     Edit <code>src/App.js</code> and save to reload.
//   </p>
//   <a
//     className="App-link"
//     href="https://reactjs.org"
//     target="_blank"
//     rel="noopener noreferrer"
//   >
//     Learn React
//   </a> 
//   </header>
//  */}

