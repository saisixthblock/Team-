import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="topnav">
      <ul id="ultag">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/profile">
          <li>Profile</li>
        </Link>
        <Link to="/about">
          <li>About</li>
        </Link>
        <Link to="/contact">
          <li>Contact</li>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
