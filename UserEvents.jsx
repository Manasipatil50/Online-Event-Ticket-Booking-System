import React, { useEffect, useState } from "react";
import API from "../services/api"; // ✅ Use API, not axios

export default function UserEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await API.get("/events"); // ✅ Only path, baseURL in API
        setEvents(res.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }
    fetchEvents();
  }, []);

  return (
    <div>
      <h2>All Events</h2>
      <ul>
        {events.map(event => (
          <li key={event.id}>{event.name} - {event.date}</li>
        ))}
      </ul>
    </div>
  );
} 