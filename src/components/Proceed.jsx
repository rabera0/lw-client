import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
// import '../App.css';

function Proceed() {
    return (
      <div className="Proceed">
        <h1>THE AT&T PERCH LIVING MURAL</h1>
        <br></br>
        <br></br>
        <p>What is your zipcode?</p>
        <br></br>
        <br></br>
          <Link to='/zipcode'>
          <button>Atlanta Visitor</button>
        </Link> 
        <br></br>
        <br></br>
          <Link to='/zipcode'>
          <button>US Visitor</button>
        </Link>
        <br></br>
        <br></br>
        
        <Link to='/intlmap'>
          <button>International Visitor</button>
        </Link>
     
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Footer />
        <br></br>
        <br></br>
      </div>
    );
  }
  
  export default Proceed;