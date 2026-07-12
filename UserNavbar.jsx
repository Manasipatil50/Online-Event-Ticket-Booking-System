import { useNavigate, NavLink } from "react-router-dom";

export default function UserLayout() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "User";

  const handleLogout = () => {
    localStorage.removeItem("username"); // clear the username
    navigate("/login"); // redirect to login page
  };

  return (
    <div className="user-dashboard">

      {/* 🔝 NAVBAR */}
      <header className="user-navbar">
        <div className="navbar-left">
          <div className="logo">SMART EVENT</div>
        </div>

        <div className="navbar-right">
          <span className="welcome-text">👋{username}</span>

          <NavLink to="/dashboard/profile" className="top-link">
            👤 Profile
          </NavLink>

          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </header>

    </div>
  );
}