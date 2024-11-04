// Footer.js
import React from 'react';
import logo from '../att_logo.png';
import '../index.css';
const img = 'https://cdn.glitch.global/f45e1b7b-5bbc-4ef0-82cf-33f60ccdb1c4/AT%26T%20White%20Logo.png?v=1727867649060';

function Footer() {
  return (
    <div className="footer">
       <img src={img} className="logo" alt="Logo" />
    </div>
  );
}

export default Footer;