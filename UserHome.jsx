import { useState, useEffect } from "react";
import BookingForm from "./BookingForm";
import API from "../services/api";
import "./UserHome.css";

export default function UserHome() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const token = localStorage.getItem("token"); // JWT token if logged in

  useEffect(() => {
    async function fetchUpcoming() {
      setLoading(true);
      try {
        const res = await API.get("/events/upcoming-public", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          withCredentials: true, // in case backend uses cookies
        });
        setEvents(res.data);
      } catch (err) {
        if (err.response) {
          // Axios error with response
          if (err.response.status === 403) {
            console.error("Access forbidden: You may need to log in.");
          } else {
            console.error(`Error ${err.response.status}: ${err.response.data?.message || err.message}`);
          }
        } else {
          console.error("Network or Axios error:", err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchUpcoming();
  }, [token]);

  return (
    <div className="user-home">
      <h2>Upcoming Events</h2>
      {loading ? (
        <p>Loading...</p>
      ) : events.length === 0 ? (
        <p>No upcoming events</p>
      ) : (
        <div className="event-container">
          {events.map((ev) => (
            <div className="event-card" key={ev.id}>
              <img
                src={ev.imageUrl || "https://placehold.co/200x150?text=No+Image"}
                alt={ev.title || "Event image"}
                className="event-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/200x150?text=No+Image";
                }}
              />
              <h4>{ev.title || "Event Title"}</h4>
              <p>📍 {ev.location}</p>
              <p>💰 ₹{ev.price}</p>
              <p>Type: {ev.type}</p>
              <button onClick={() => setSelectedEvent(ev)}>Book Now</button>
            </div>
          ))}
        </div>
      )}
      {selectedEvent && (
        <BookingForm
          event={selectedEvent}
          token={token}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}