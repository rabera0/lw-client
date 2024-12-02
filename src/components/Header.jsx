import React from 'react';
import '../index.css';
import logo from '../assets/PerchMark.png';

function Header() {
  return (
    <div className="Header">
      <img src={logo} alt="logo" className="perch" />
      <h1>LIVING MURAL</h1>
    </div>
  );
}

export default Header;
