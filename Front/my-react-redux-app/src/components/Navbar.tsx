import React from 'react';
import { Link } from 'react-router-dom'; // For routing to login and register pages
import './Navbar.css'; // Import your CSS file

const Navbar = () => {
  return (
    <nav className="colorful-navbar">
      
      

      {/* Navigation links (optional) */}
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>

      {/* Login and register buttons */}
      <div className="auth-buttons">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;
