import React from 'react';
import './Navbar.css';
import profile from '../../assets/images/profile.jpg'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-right">
        <ul>
          <li>Dynamic form </li>
        </ul>
      </div>
      <div className="navbar-left">
        <img
          src={profile}
          alt="Profile"
          className="profile-image"
        />
        <span className="profile-name">John Doe</span>
      </div>
    </nav>
  );
};

export default Navbar;
