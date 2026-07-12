import React, { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "./UserEventPage.css";

export default function UserEventPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await API.get("/vendor/events");
      setEvents(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (eventId) => {
    try {
      const res = await API.post("/booking/create", null, {
        params: { eventId, tickets: 1 },
      });

      const bookingId = res.data.bookingId;

      // 👉 payment page
      navigate(`/payment/${bookingId}`);

    } catch (err) {
      console.error(err);
      alert("Booking Failed ❌");
    }
  };

  const handleWishlist = async (eventId) => {
    try {
      await API.post(`/wishlist/${eventId}`);
      alert("Added to Wishlist ❤️");
    } catch (err) {
      console.error(err);
      alert("Failed ❌");
    }
  };

  return (
    <div className="event-container">
      <h2 className="title">🎉 Available Events</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="event-grid">
          {events.map((event) => (
            <div className="event-card" key={event.id}>
              
              <div className="event-img">
                {event.imagePath ? (
                  <img
                    src={`http://localhost:8080/${event.imagePath}`}
                    alt={event.name}
                  />
                ) : (
                  <div className="placeholder">No Image</div>
                )}
              </div>

              <h3>{event.name}</h3>
              <p>📍 {event.location}</p>
              <p>💰 ₹{event.price}</p>

              <div className="buttons">
                <button onClick={() => handleBooking(event.id)}>
                  Book Now
                </button>

                <button
                  className="wishlist"
                  onClick={() => handleWishlist(event.id)}
                >
                  ❤️
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
} 