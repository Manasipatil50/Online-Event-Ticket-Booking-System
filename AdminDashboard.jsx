import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import BookingChart from "../components/BookingChart";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [bookingData, setBookingData] = useState([]);
  const [latestUsers, setLatestUsers] = useState([]);
  const [pendingVendors, setPendingVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================== Fetch all data ==================
  useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);

      // Admin Stats
      const statsRes = await API.get("/admin/stats", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setStats(statsRes.data);

      // Booking Stats (Graph)
      const bookingsRes = await API.get("/admin/booking-stats", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setBookingData(bookingsRes.data);

      // Latest Users
      const usersRes = await API.get("/admin/users/latest", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setLatestUsers(usersRes.data);

      // Pending Vendors
      const vendorsRes = await API.get("/admin/vendors", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      const pending = vendorsRes.data.filter(v => v.status === "PENDING");
      setPendingVendors(pending);

      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  fetchData();
}, []);

  if (loading) {
    return <div className="dashboard"><h3>Loading Dashboard...</h3></div>;
  }

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="logo">SmartEvent</h2>
        <ul>
          <li><Link to="/admindashboard">Dashboard</Link></li>
          <li><Link to="/users">Users</Link></li>
          <li><Link to="/vendors">Vendors</Link></li>
          <li><Link to="/events">Events</Link></li>
          <li><Link to="/bookings">Bookings</Link></li>
          <li><Link to="/payments">Payments</Link></li>
        </ul>
      </div>

      {/* Main */}
      <div className="main">
        <h2>Welcome, Admin!</h2>

        {/* Top Cards */}
        {stats && (
          <div className="cards">
            <div className="card blue" onClick={() => navigate("/users")}>
              <h3>Total Users</h3>
              <h1>{stats.users}</h1>
            </div>
            <div className="card purple" onClick={() => navigate("/vendors")}>
              <h3>Total Vendors</h3>
              <h1>{stats.vendors}</h1>
            </div>
            <div className="card green" onClick={() => navigate("/events")}>
              <h3>Total Events</h3>
              <h1>{stats.events}</h1>
            </div>
            <div className="card red" onClick={() => navigate("/bookings")}>
              <h3>Total Bookings</h3>
              <h1>{stats.bookings}</h1>
            </div>
            <div className="card orange" onClick={() => navigate("/payments")}>
              <h3>Total Revenue</h3>
              <h1>₹{stats.revenue}</h1>
            </div>
          </div>
        )}

        {/* Bottom Section */}
        <div className="bottom-section">
          <div className="left-column">
            <div className="box">
              <h3>System Overview</h3>
              <div className="fake-chart">
                <div className="chart-item"><div className="circle blue"></div><p>Users: <strong>{stats?.users}</strong></p></div>
                <div className="chart-item"><div className="circle purple"></div><p>Vendors: <strong>{stats?.vendors}</strong></p></div>
                <div className="chart-item"><div className="circle green"></div><p>Events: <strong>{stats?.events}</strong></p></div>
                <div className="chart-item"><div className="circle red"></div><p>Bookings: <strong>{stats?.bookings}</strong></p></div>
                <div className="chart-item"><div className="circle orange"></div><p>Revenue: <strong>₹{stats?.revenue}</strong></p></div>
              </div>
            </div>
          </div>

          <div className="right-column">
            <div className="box">
              <h3>Bookings Analytics</h3>
              <BookingChart data={bookingData} />
            </div>

            <div className="box">
              <h3>Latest Users</h3>
              <table>
                <thead>
                  <tr><th>Name</th><th>Email</th><th>Role</th></tr>
                </thead>
                <tbody>
                  {latestUsers.length > 0 ? latestUsers.map(u => (
                    <tr key={u.id}>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.role}</td>
                    </tr>
                  )) : <tr><td colSpan={3}>No users found</td></tr>}
                </tbody>
              </table>
            </div>

            <div className="box">
              <h3>Pending Vendor Approvals</h3>
              <table>
                <thead><tr><th>Name</th><th>Email</th><th>Action</th></tr></thead>
                <tbody>
                  {pendingVendors.length > 0 ? pendingVendors.map(v => (
                    <tr key={v.id}>
                      <td>{v.name}</td>
                      <td>{v.email}</td>
                      <td>
                        <button onClick={async ()=>{ await API.put(`/admin/approve-vendor/${v.id}`); window.location.reload(); }}>Approve</button>
                        <button onClick={async ()=>{ await API.put(`/admin/reject-vendor/${v.id}`); window.location.reload(); }}>Reject</button>
                      </td>
                    </tr>
                  )) : <tr><td colSpan={3}>No pending vendors</td></tr>}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}