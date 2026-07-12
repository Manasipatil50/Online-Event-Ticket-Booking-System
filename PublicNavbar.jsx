import React from "react";
import "./PublicNavbar.css";

const PublicNavbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">SmartEvent</div>

      <div className="nav-center">
        <a href="/">Home</a>
        <a href="/about">About</a>
      </div>

      <div className="nav-right">
        <a href="/login">Login</a>
        <a href="/register" className="register-btn">Register</a>
      </div>
    </nav>
  );
};

export default PublicNavbar;