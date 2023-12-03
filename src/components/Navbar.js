import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/HELogo.png';

import '../css/Navbar.css';

function Logo() {
  return <img src={logo} alt="ToFromLogo"/>  
}

function NavBar() {

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <Logo />  
      </Link>
      
      <div className="navbar-links">
        <Link className="navbar-login-link" to="/login">
          Login 
        </Link>
        <Link className="navbar-events-link" to="/events">
          Events
        </Link>  
      </div>
    </nav>
  );
}

export default NavBar;