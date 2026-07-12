// src/pages/UserDashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";

export default function UserDashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>User Dashboard</h2>

      <div className="cards-container">

<div className="card" onClick={() => navigate("/dashboard/allevents")}>         
   <h3>📅 All Events</h3>
          <p>Explore events</p>
        </div>

        <div className="card" onClick={() => navigate("/dashboard/booking")}>
          <h3>📖 My Bookings</h3>
          <p>View your bookings</p>
        </div>

        <div className="card" onClick={() => navigate("/dashboard/wishlist")}>
          <h3>💖 Wishlist</h3>
          <p>Your favorite events</p>
        </div>
      </div>
    </div>
  );
} 