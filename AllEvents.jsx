import { useState, useEffect } from "react";
import BookingForm from "./BookingForm";
import API from "../services/api";
import "./UserHome.css";

export default function AllEvents() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filter, setFilter] = useState({ type: "", city: "", maxPrice: "" });

  const fetchEvents = async () => {
    try {
      let query = new URLSearchParams();

      if (filter.type) query.append("type", filter.type);
      if (filter.city) query.append("city", filter.city);
      if (filter.maxPrice) query.append("maxPrice", filter.maxPrice);

      // ✅ FIXED API
      const res = await API.get(`/events/user/all?${query}`);

      setEvents(res.data);

    } catch (err) {
      console.error("Error fetching events:", err);

      if (err.response) {
        alert(`Error ${err.response.status}: ${err.response.data}`);
      } else {
        alert("Failed to fetch events ❌");
      }
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const addWishlist = async (eventId) => {
    try {
      // ✅ FIXED API
      await API.post(`/wishlist/${eventId}`);
      alert("Added to wishlist ❤️");
    } catch (err) {
      console.error(err);
      alert("Failed to add wishlist");
    }
  };

  return (
    <div className="user-home">
      <h2>All Events</h2>

      <div className="filter-container">
        <input
          placeholder="Type"
          value={filter.type}
          onChange={e => setFilter({ ...filter, type: e.target.value })}
        />
        <input
          placeholder="City"
          value={filter.city}
          onChange={e => setFilter({ ...filter, city: e.target.value })}
        />
        <input
          placeholder="Max Price"
          value={filter.maxPrice}
          onChange={e => setFilter({ ...filter, maxPrice: e.target.value })}
        />
        <button onClick={fetchEvents}>Search</button>
      </div>

      <div className="event-container">
        {events.length === 0 ? (
          <p>No events found</p>
        ) : (
          events.map(ev => (
            <div className="event-card" key={ev.id}>
              <img
                src={ev.imagePath
                  ? `http://localhost:8080/${ev.imagePath}`
                  : "/placeholder.jpg"}
                alt={ev.name}
                className="event-image"
              />

              <h4>{ev.name}</h4>
              <p>📍 {ev.location}</p>
              <p>💰 ₹{ev.price}</p>
              <p>Type: {ev.type}</p>

              <div className="event-buttons">
                <button onClick={() => setSelectedEvent(ev)}>Book</button>
                <button
                  className="wishlist"
                  onClick={() => addWishlist(ev.id)}
                >
                  ❤️ Wishlist
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedEvent && (
        <BookingForm
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
} 