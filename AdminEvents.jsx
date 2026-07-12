import React, { useEffect, useState } from "react";
import API from "../services/api";
import "./AdminEvents.css";

function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  const role = localStorage.getItem("role");

  useEffect(() => {
    if (role === "ADMIN") {
      fetchEvents();
    }
  }, [role]);

  const fetchEvents = async () => {
    try {
      const res = await API.get("/admin/events"); // ✅ FIXED
      setEvents(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch events ❌");
    }
  };

  if (role !== "ADMIN") {
    return <h3 style={{ color: "red" }}>Access Denied ❌</h3>;
  }

  const filtered = events.filter(
    (e) =>
      (e.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (e.location || "").toLowerCase().includes(search.toLowerCase()) ||
      (e.vendorName || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-events-page">
      <h2>All Events (Admin)</h2>

      <input
        className="search-box"
        placeholder="Search by name, location, vendor..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Price</th>
              <th>Vendor</th>
              <th>Event Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((e) => (
                <tr key={e.id}>
                  <td>{e.name}</td>
                  <td>{e.location}</td>
                  <td>₹{e.price}</td>
                  <td>{e.vendorName}</td>
                  <td>
                    {e.eventDate
                      ? new Date(e.eventDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No events found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminEvents;