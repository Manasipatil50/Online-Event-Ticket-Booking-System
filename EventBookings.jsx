// src/pages/EventBooking.jsx
import React, { useState, useEffect } from "react";
import API from "../services/api";

export default function EventBooking({ eventId }) {
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [tickets, setTickets] = useState(1);

  useEffect(() => {
    // Fetch services for this event
    API.get(`/services/event/${eventId}`)
      .then(res => setServices(res.data))
      .catch(err => console.error(err));
  }, [eventId]);

  const handleServiceToggle = (serviceId) => {
    if (selectedServices.includes(serviceId)) {
      setSelectedServices(selectedServices.filter(id => id !== serviceId));
    } else {
      setSelectedServices([...selectedServices, serviceId]);
    }
  };

  const handleBooking = () => {
    const token = localStorage.getItem("token"); 
    API.post(
      `/bookings/${eventId}`,
      { tickets, serviceIds: selectedServices },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(res => alert("Booking Successful!"))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Book Event</h2>
      <div>
        <label>Tickets:</label>
        <input
          type="number"
          min="1"
          value={tickets}
          onChange={e => setTickets(Number(e.target.value))}
        />
      </div>

      <div>
        <h3>Services</h3>
        {services.map(service => (
          <div key={service.id}>
            <input
              type="checkbox"
              checked={selectedServices.includes(service.id)}
              onChange={() => handleServiceToggle(service.id)}
            />
            {service.name} - ₹{service.price}
          </div>
        ))}
      </div>

      <button onClick={handleBooking}>Book Event</button>
    </div>
  );
} 