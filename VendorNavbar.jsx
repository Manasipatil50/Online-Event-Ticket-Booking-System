import React from "react";
import "./VendorNavbar.css";

export default function VendorNavbar({ vendorName }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="vendor-navbar">
      <div className="navbar-left">
        <h2>SmartEvent</h2>
      </div>
      <div className="navbar-right">
        <span className="vendor-name">👤 {vendorName || "Vendor"}</span>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}