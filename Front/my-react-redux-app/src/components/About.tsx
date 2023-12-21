import React from 'react';
import '../features/about/About.css'; // Importing the CSS for styling

const About = () => {
  return (
    <div className="page-content">
      <img src="/images/image5.png" alt="About Page Image" className="centered-image"/>
      <h1>About Us</h1>
      <p>Learn more about what we do and our mission.</p>
    </div>
  );
};

export default About;
