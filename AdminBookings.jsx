import React, { useEffect, useState } from "react";
import API from "../services/api";
import "./AdminBookings.css";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await API.get("/admin/bookings");
        setBookings(res.data);
      } catch (error) {
        console.error("Error:", error);
        alert("Failed: " + (error.response?.data || error.message));
      }
    }

    fetchBookings();
  }, []);

  // 🔍 Search filter
  const filteredBookings = bookings.filter((b) =>
    b.user?.email?.toLowerCase().includes(search.toLowerCase()) ||
    b.event?.name?.toLowerCase().includes(search.toLowerCase()) ||
    b.event?.vendor?.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-container">
      <h2>Admin Bookings</h2>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search by user, event, vendor..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-box"
      />

      <table className="booking-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Event</th>
            <th>Vendor</th>
            <th>Tickets</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {filteredBookings.length > 0 ? (
            filteredBookings.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.user?.email}</td>
                <td>{b.event?.name}</td>
                <td>{b.event?.vendor?.email}</td>
                <td>{b.tickets}</td>
                <td>₹ {b.totalPrice}</td>

                <td className={`status ${b.status.toLowerCase()}`}>
                  {b.status}
                </td>

                <td>{new Date(b.createdAt).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="no-data">
                No bookings found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
} 