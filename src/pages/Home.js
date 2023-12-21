import React from "react";
import { Link } from "react-router-dom";

import registrationImage from "../images/undraw_sign_up_n6im.svg";
import matchingImage from "../images/undraw_sync_re_492g.svg";
import sendingGiftImage from "../images/undraw_delivery_truck_vt6p.svg";
import receiveGiftImage from "../images/undraw_arrived_re_t2bw.svg";

import homePageImage from "../images/home-container-image.svg"

import "../css/homepage.css";
import Gallery from "./Gallery";

function Home() {
  return (
    <div className="homepage-container">
  <div className="title-slogan-container">
    <div className="text-container">
      <div className="h1-container">
        <h1 className="happiness-title">Happiness</h1>
        <h1 className="exchange-title">Exchange</h1>
      </div>
      <h2 className="slogan">
        Bringing People Together Through Thoughtful Gestures
      </h2>
      <h3 className="slogan-2">Join the Exchange of Happiness where gift giving is fun and stress-free! Events are hapening every month - sign up for free to join the fun</h3>
      <Link id="main-signup-link" className="homepage-signup-link" to="/signup">
        Signup Now!
      </Link>
    </div>
    <div className="image-container">
      <img src={homePageImage} alt="homepage-gift-image" />
    </div>
  </div>

  <h1 className="how-it-works-title">How it Works</h1>

  <div className="how-it-works-container">
    <section className="how-it-works">
      <div className="step-container">
        <h2 className="step-container-title">Register</h2>
        <img src={registrationImage} alt="Register" />
        <p className="step-container-text">
          Register for an account to join our community.
        </p>
      </div>

      <div className="step-container">
        <h2 className="step-container-title">Get Matched</h2>
        <img src={matchingImage} alt="Get Matched" />
        <p className="step-container-text">
          Get matched with someone in our community.
        </p>
      </div>

      <div className="step-container">
        <h2 className="step-container-title">Send a Gift</h2>
        <img src={sendingGiftImage} alt="Send a Gift" />
        <p className="step-container-text">
          Send a thoughtful gift to your match.
        </p>
      </div>

      <div className="step-container">
        <h2 className="step-container-title">Receive a Gift</h2>
        <img src={receiveGiftImage} alt="Receive a Gift" />
        <p className="step-container-text">
          Receive a thoughtful gift from your match.
        </p>
      </div>
    </section>
  </div>
  {/* <div className="signup-container">
    <section className="signup">
      <h2 className="signup-h2-title">Sign Up Today!</h2>
      <p className="signup-text">
        Join our community and spread happiness. Sign up now to start
        exchanging thoughtful gifts.
      </p>
      <div className="homepage-link-container">
        <Link className="homepage-signup-link" to="/signup">
          Sign Up
        </Link>
      </div>
    </section>
  </div> */}
  <div className="gallery-container">
        <Gallery previewMode={true} />
      </div>
</div>
  );
}

export default Home;
