// src/components/Navbar.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { logoutUser } from '../features/login/loginSlice'; 
import './Navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.login);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser() as any);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="colorful-navbar">
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/products">Products</Link> {/* Add this line */}
        </li>
        <li>
          <Link to="/reviews">Reviews</Link> {/* Add this line */}
        </li>
      </ul>


      {user ? (
        <div className="auth-buttons">
          <span style={{ marginRight: '10px', color: '#fff' }}>
            Welcome, {user.username}!
          </span>
          <button
            className="auth-buttons button logout"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="auth-buttons">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
