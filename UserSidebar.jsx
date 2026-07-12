import React from "react";
import { NavLink } from "react-router-dom";
import "./UserSidebar.css";

function UserSidebar() {
  return (
    <div className="user-sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li>
          <NavLink
            to="/dashboard/allevents"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Events
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/booking"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Bookings
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/wishlist"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Wishlist
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default UserSidebar;