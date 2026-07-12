// src/components/admin/AdminNavbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminNavbar.css";

export default function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="admin-navbar">
      <div className="nav-left">
        <h2>SmartEvent Admin</h2>
      </div>

      <div className="nav-right">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}