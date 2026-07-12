import React, { useState } from "react";
import { useNavigate, NavLink, Outlet } from "react-router-dom";
import UserSidebar from "./UserSidebar";
import "./UserLayout.css";

export default function UserLayout() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "User";

  const [active, setActive] = useState("events"); // sidebar active

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="user-layout">
      {/* Sidebar */}
      <UserSidebar active={active} setActive={setActive} />

      {/* Main content */}
      <div className="main-area">
        {/* Navbar */}
        <header className="user-navbar">
          <div className="navbar-left">SMART EVENT</div>

          <div className="navbar-right">
            <span> 👋{username} </span>

            <NavLink to="profile" className="top-link">
              Profile
            </NavLink>

            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </header>

        {/* Page content */}
        <div className="content-area">
          <Outlet />
        </div>
      </div>
    </div>
  );
}