import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./VendorSidebar.css";

export default function VendorSidebar() {
  const location = useLocation();

  return (
    <div className="sidebar">
      <h2 className="logo">SmartEvent</h2>

      <Link to="/vendor/dashboard" className={location.pathname.includes("dashboard") ? "active" : ""}>
        📊 Dashboard
      </Link>

      <Link to="/vendor/create-event">
        ➕ Create Event
      </Link>

      <Link to="/vendor/events" className={location.pathname.includes("Events") ? "active" : ""}>
        📅 Events
      </Link>

      <Link to="/vendor/bookings" className={location.pathname.includes("bookings") ? "active" : ""}>
        📖 Bookings
      </Link>

      <li onClick={() => navigate("/vendor/earnings")}>
  💰 Earnings
</li>

      <Link to="/vendor/profile">
        👤 Profile
      </Link>
    </div>
  );
}