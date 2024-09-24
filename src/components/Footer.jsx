// Footer.js
import React from 'react';
import logo from '../att-logo.png';
import '../index.css';

function Footer() {
  return (
    <div className="footer">
      <img src={logo} className="logo" alt="Logo" />
    </div>
  );
}

export default Footer;