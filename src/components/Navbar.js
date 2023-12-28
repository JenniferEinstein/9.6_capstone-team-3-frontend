import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/HELogo.png';
import LoginModal from './LoginModal';
import '../css/Navbar.css';

function Logo() {
  return <img src={logo} alt="ToFromLogo" />;
}

function NavBar({ handleLogout, user, userId }) {
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
        <div id='navbar-middle-links'>
          <Link to="/events" id="events-middle-link" className="navbar-middle-link">Events</Link>
          <Link to="/how-it-works" id="hiw-middle-link" className="navbar-middle-link">How it works</Link>
          <Link to="/about" id="about-middle-link" className="navbar-middle-link">About</Link>
        </div>
      </div>
      <div id="navbar-links" className="navbar-links">
        {user ? (
          // If user is logged in, show Profile and Logout buttons
          <>
            {userId && (
              <Link to={`/profile/${userId}`} id="navbar-profile-link">
                Profile
              </Link>
            )}
            <button id="navbar-logout" className="navbar-login-link" onClick={handleLogout}>
              Logout
            </button>
            {/* You can add additional items related to the authenticated user here */}
          </>
        ) : (
          // If user is not logged in, show Login and Signup buttons
          <>
            <button id="navbar-login" className="navbar-login-link" onClick={openModal}>
              Login
            </button>
            <Link id="navbar-singup" className="homepage-signup-link" to="/signup">
              Sign Up
            </Link>
          </>
        )}
      </div>

      {/* Render the modal if it's open */}
      {isModalOpen && <LoginModal openModal={closeModal} />}
    </nav>
  );
}

export default NavBar;
