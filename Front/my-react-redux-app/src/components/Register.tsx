// src/components/Register.tsx

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { AppDispatch } from '../app/store'; // Import the AppDispatch type
import { registerUser } from '../features/register/registerSlice';

const Register: React.FC = () => {
  const dispatch: AppDispatch = useDispatch(); // Use the AppDispatch type
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { status, error, user } = useSelector((state: RootState) => state.register);

  const handleRegister = async () => {
    try {
      const resultAction = await dispatch(registerUser({ username, email, password }));
      if (registerUser.fulfilled.match(resultAction)) {
        // Handle success if needed
      } else if (registerUser.rejected.match(resultAction)) {
        // Handle error if needed
      }
    } catch (error) {
      // Handle other errors if needed
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={status === 'loading'}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading'}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={status === 'loading'}
        />
      </div>
      <button onClick={handleRegister} disabled={status === 'loading'}>
        {status === 'loading' ? 'Registering...' : 'Register'}
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {user && <div style={{ color: 'green' }}>Registration successful for {user.username}!</div>}
    </div>
  );
};

export default Register;