// About.js

import React, { useEffect } from 'react';
import '../css/about.css'
import SaraiPic from "../images/Pursuit_ST.jpg";
import JenniferPic from "../images/Jennifer Einstein_2022_Pursuit_a copy.jpg";
import JoanavelPic from "../images/Pursuit_JP.jpg";
import FAQ from '../components/FAQ';

function About() {
  //make sure that the user is scrolled to the correct place when they press the FAQ link
  useEffect(() => {
    const faqElement = document.getElementById('faq');
    if (faqElement){
      faqElement.scrollIntoView({ behavior: 'smooth'});
    }
  }, [])
  return (
    <div className='about container-fluid p-5'>
      <h1 className='display-6'>Header for About Page</h1>
      <div>
        <h2>How Does It Work?</h2>
      </div>
      <br/>
      <div >
        <h2 className='display-6'></h2>
          <FAQ id='faq'/>
      </div>
      <br/>
      <div className='developers'>
        <h2 className='display-6'>App Developers</h2>
        <div className='individual-devs'>
          <img 
            src={JenniferPic} 
            alt="profile pic of Jennifer" 
            className="dev-profile-pic img-thumbnail"/>
          <a href="https://github.com/JenniferEinstein" className="developer">Jennifer Einstein </a>
          <p>Hailing from the Golden State, Jennifer Einstein is known among her family and friends as an inventive gift giver. The best gift she ever received was 500 individual packets of mustard from her father after complaining that no one served yellow mustard in New York City, where she now lives. Jennifer aims to make the modern world a better place, one line of code at a time. </p>
          <br/>

          <img 
            src={JoanavelPic} 
            alt="profile pic of Joanavel" 
            className="img-thumbnail dev-profile-pic "/>
          <a href="https://github.com/JoanavelPascual7" className="developer">Joanavel Pascual</a>
          <p>Joanavel Pascual is a web developer with a passion for social impact. Based in New York City, he has a background in social work. </p>
          <br/>

          <img 
            src={SaraiPic} 
            alt="profile pic of Sarai" 
            className="img-thumbnail dev-profile-pic "/>
          <a href="https://github.com/Sarai-ii" className="developer">Sarai Thomas </a>
          <p>Sarai Thomas is a software engineer and digital designer; she is also the lead on this project. Sarai has combined her background in business with her creativity skills to become the CEO and creative director of GLD RZÉ, a new luxery jewelry line.</p>
          <br/>
        </div>

        <div>
            <h6>Credits</h6>
              <ul className='list credits-list'>
                <li>placeholder one</li>
                <li>placeholder two</li>
              </ul>
        </div>
      </div>




    </div>
  )
}

export default About