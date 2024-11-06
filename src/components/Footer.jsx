// Footer.js
import React from 'react';
import { Link } from 'react-router-dom'; // Use Link for navigation
import logo from '../att_logo.png'; // Your logo path
import '../index.css';

function Footer({ onLogoClick }) {
  // Handle logo click and notify parent
  const handleLogoClick = () => {
    if (onLogoClick) onLogoClick();  // Notify parent component that the logo was clicked
  };

  return (
    <div className="footer">
      {/* <Link to="/" onClick={handleLogoClick}>  */}
      <img src={logo} className="logo" alt="Logo" />
    </div>
  );
}

export default Footer;
