import { useState, useEffect } from "react";
import BookingForm from "./BookingForm";
import API from "../services/api";
import "./UserHome.css";

export default function AllEvents() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filter, setFilter] = useState({ type: "", city: "", maxPrice: "" });
  const token = localStorage.getItem("token");

  const fetchEvents = async () => {
    let query = new URLSearchParams();
    if (filter.type) query.append("type", filter.type);
    if (filter.city) query.append("city", filter.city);
    if (filter.maxPrice) query.append("maxPrice", filter.maxPrice);

    const res = await API.get(`/users/events?${query}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setEvents(res.data);
  };

  useEffect(() => { fetchEvents(); }, []);

  const addWishlist = async (eventId) => {
    await API.post(`/users/wishlist/${eventId}`, null, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert("Added to wishlist ❤️");
  };

  return (
    <div className="user-home">
      <h2>All Events</h2>
      <div className="filter-container">
        <input placeholder="Type" value={filter.type} onChange={e => setFilter({...filter,type:e.target.value})} />
        <input placeholder="City" value={filter.city} onChange={e => setFilter({...filter,city:e.target.value})} />
        <input placeholder="Max Price" value={filter.maxPrice} onChange={e => setFilter({...filter,maxPrice:e.target.value})} />
        <button onClick={fetchEvents}>Search</button>
      </div>

      <div className="event-container">
        {events.map(ev => (
          <div className="event-card" key={ev.id}>
            <img src={ev.imagePath ? `http://localhost:8080/${ev.imagePath}` : "/placeholder.jpg"} 
                 alt={ev.name} className="event-image"/>
            <h4>{ev.name}</h4>
            <p>📍 {ev.location}</p>
            <p>💰 ₹{ev.price}</p>
            <p>Type: {ev.type}</p>
            <div className="event-buttons">
              <button onClick={() => setSelectedEvent(ev)}>Book</button>
              <button className="wishlist" onClick={() => addWishlist(ev.id)}>❤️ Wishlist</button>
            </div>
          </div>
        ))}
      </div>
      {selectedEvent && <BookingForm event={selectedEvent} token={token} onClose={() => setSelectedEvent(null)} />}
    </div>
  );
}