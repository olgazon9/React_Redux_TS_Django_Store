// src/components/Login.tsx

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { loginUser } from "../features/login/loginSlice";
import { useState } from "react";

const Login: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { status, error, user } = useSelector((state: RootState) => state.login);
  
    const handleLogin = () => {
      dispatch(loginUser({ username, password })); // No cast needed
    };
  
    return (
      <div>
        <h2>Login</h2>
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
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={status === 'loading'}
          />
        </div>
        <button onClick={handleLogin} disabled={status === 'loading'}>
          {status === 'loading' ? 'Logging In...' : 'Login'}
        </button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {user && <div style={{ color: 'green' }}>Welcome, {user.username}!</div>}
      </div>
    );
  };
  
  export default Login;
  