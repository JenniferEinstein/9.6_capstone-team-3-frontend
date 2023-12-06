import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import axios from 'axios';

import "../css/Signup.css"


const Signup = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [addressStreet1, setAddressStreet1] = useState('');
    const [addressStreet2, setAddressStreet2] = useState('');
    const [addressCity, setAddressCity] = useState('');
    const [addressState, setAddressState] = useState('');
    const [addressZip, setAddressZip] = useState('');
    const [bio, setBio] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false); 
  
    const handleSignup = async (e) => {
      e.preventDefault(); 
  
      try {
        setIsLoading(true); 
  
        if (!email || !password || !username || !firstName || !lastName) {
          setError('Email, password, username, first name, and last name are required.');
          setIsLoading(false); 
          return;
        }
    
        // Create user in Firebase
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid

        console.log('Firebase user created:', userCredential.user);
        console.log('You Got The ID BABYYYYYYYY', uid);
    
        // Create user profile on your server
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/users`, {
          firebase_uid: uid, 
          username,
          password,
          admin: false,
          verified: false,
          name_first: firstName,
          name_last: lastName,
          email,
          address_street1: addressStreet1,
          address_street2: addressStreet2,
          address_city: addressCity,
          address_state: addressState,
          address_zip: addressZip,
          user_banned: false,
          user_premium: false,
          isluxury: false,
          bio,
          // created_date: created,
        });
        if (response.data.error) {
          setError(`Signup Error: ${response.data.error}`);
          setIsLoading(false);
          return;
        }
        const userId = response.data.id;
        // console.log('Backend response:', response.data);
        // console.log(userId)
        
        setSuccessMessage(
         `Signup successful! You are now logged in as ${email}.`
        );
        setError(null);
        navigate(`/profile/${userId}`)
      } catch (error) {
        console.error('Signup Error:', error.message);
        setSuccessMessage(null);
        setError(`Signup Error: ${error.message}`);
      } finally {
        setIsLoading(false); 
      }
    };
    
  
    return (
      <div id="signup-container">
        <div id='signup-h1-container'>
          <h1 id='signup-title-h1'>Create an account</h1>
        </div>
        <div id='signup-form-container' >
          <form onSubmit={handleSignup} id="signup-form">
            <label>
              Email:
              <input
                id='signup-input-email'
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              Password:
              <input
                id='signup-input-password'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <label>
              Username:
              <input
                id='signup-input-username'
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label>
              First Name:
              <input
                id='signup-input-firstname'
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            <label>
              Last Name:
              <input
                id='signup-input-lastname'
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
            <label>
              Street Address 1:
              <input
                id='signup-input-address1'
                type="text"
                value={addressStreet1}
                onChange={(e) => setAddressStreet1(e.target.value)}
              />
            </label>
            <label>
              Street Address 2:
              <input
                id='signup-input-address2'
                type="text"
                value={addressStreet2}
                onChange={(e) => setAddressStreet2(e.target.value)}
              />
            </label>
            <label>
              City:
              <input
                id='signup-input-city'
                type="text"
                value={addressCity}
                onChange={(e) => setAddressCity(e.target.value)}
              />
            </label>
            <label>
              State:
              <input
               id='signup-input-state'
                type="text"
                value={addressState}
                onChange={(e) => setAddressState(e.target.value)}
              />
            </label>
            <label>
              ZIP Code:
              <input
                id='signup-input-zip'
                type="text"
                value={addressZip}
                onChange={(e) => setAddressZip(e.target.value)}
              />
            </label>
            <label>
              Bio:
              <textarea id='signup-textarea-bio' value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
            </label>
            <button id='signup-button-submit' type="submit" disabled={isLoading}>
              {isLoading ? 'Signing up...' : 'Signup'}
            </button>
          </form>
        </div>
        <div id='error-message-container'></div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </div>
    );
}

export default Signup;