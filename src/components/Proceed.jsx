import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

function Proceed() {
    return (
      <div>
        <Header />
          <div  className="Proceed">
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
          <br />
          <br />
        </div>
        <Footer />
      </div>
    );
  }
  
  export default Proceed;