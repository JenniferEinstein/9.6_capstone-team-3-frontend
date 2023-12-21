import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/HELogo.png';
import LoginModal from './LoginModal'; 
import '../css/Navbar.css';

function Logo() {
  return <img src={logo} alt="ToFromLogo"/>  
}

function NavBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <nav className="navbar">
      <div className='navbar-middle-links-container'>
        <Link to="/" className="navbar-logo">
          <Logo />  
        </Link>
        <div className='navbar-middle-links'>
          <Link to="/events" id="events-middle-link" className="navbar-middle-link">Events</Link>
          <Link to="/how-it-works" id="hiw-middle-link" className="navbar-middle-link">How it works</Link>
          <Link to="/about" id="about-middle-link" className="navbar-middle-link">About</Link>
        </div>
      </div>
      <div id="navbar-links" className="navbar-links">
        <button id="navbar-login" className="navbar-login-link" onClick={openModal}>
          Login 
        </button>
        <Link id="navbar-singup" className="homepage-signup-link" to="/signup">
          Sign Up
        </Link> 
      </div>

      {/* Render the modal if it's open */}
      {isModalOpen && <LoginModal openModal={closeModal} />}
    </nav>
  );
}

export default NavBar;
