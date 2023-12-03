import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSignup = async () => {
    try {
      if (!email || !password) {
        setError('Email and password are required.');
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Access the user information with userCredential.user
      console.log('User signed up:', userCredential.user);

      setSuccessMessage(`Signup successful! You are now logged in as ${email}.`);
      setError(null);
    } catch (error) {
      setError(`Signup Error: ${error.message}`);
      setSuccessMessage(null);
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <form>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleSignup}>
          Signup
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default Signup;


