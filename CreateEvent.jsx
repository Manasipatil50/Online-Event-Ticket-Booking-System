import React, { useState } from "react";
import API from "../services/api";
import "./CreateEvent.css";

export default function CreateEvent() {

  const [event, setEvent] = useState({
    name: "",
    description: "",
    location: "",
    imageFile: null,
  });

  const [tickets, setTickets] = useState([
    { ticketType: "", price: 0, quantity: 0 }
  ]);

  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState("");

  // ✅ FIXED JWT ROLE
  const getUserRole = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const base64 = token.split(".")[1];
      const decoded = JSON.parse(window.atob(base64));
      return decoded.role?.replace("ROLE_", "");
    } catch (err) {
      console.error("Invalid token", err);
      return null;
    }
  };

  // ✅ EVENT INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  // ✅ IMAGE
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEvent({ ...event, imageFile: file });

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✅ TICKET CHANGE (NUMBER FIX)
  const handleTicketChange = (index, field, value) => {
    const newTickets = [...tickets];

    if (field === "price" || field === "quantity") {
      newTickets[index][field] = Number(value);
    } else {
      newTickets[index][field] = value;
    }

    setTickets(newTickets);
  };

  // ✅ ADD TICKET
  const addTicket = () => {
    setTickets([...tickets, { ticketType: "", price: 0, quantity: 0 }]);
  };

  // ✅ SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("You must be logged in!");
      return;
    }

    const role = getUserRole();
    if (role !== "VENDOR") {
      setMessage("Only vendors can create events!");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", event.name);
      formData.append("description", event.description);
      formData.append("location", event.location);

      // ✅ tickets JSON
      formData.append("ticketsJson", JSON.stringify(tickets));

      // ✅ image
      if (event.imageFile) {
        formData.append("imageFile", event.imageFile);
      }

     await API.post("/events/create", formData);

      setMessage("✅ Event created successfully!");

      // RESET
      setEvent({
        name: "",
        description: "",
        location: "",
        imageFile: null,
      });

      setTickets([{ ticketType: "", price: 0, quantity: 0 }]);
      setPreview("");

    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Error creating event");
    }
  };

  return (
    <div className="create-event-container">
      <h2>Create Event</h2>

      {message && <p className="message">{message}</p>}

      <form onSubmit={handleSubmit} className="create-event-form">

        <input
          name="name"
          placeholder="Event Name"
          value={event.name}
          onChange={handleChange}
          required
        />

        <input
          name="description"
          placeholder="Description"
          value={event.description}
          onChange={handleChange}
          required
        />

        <input
          name="location"
          placeholder="Location"
          value={event.location}
          onChange={handleChange}
          required
        />

        {/* 🎟️ TICKETS */}
        <h3>Tickets</h3>

        {tickets.map((t, index) => (
          <div key={index} className="ticket-row">

            <input
              placeholder="Ticket Type (VIP / Regular)"
              value={t.ticketType}
              onChange={(e) =>
                handleTicketChange(index, "ticketType", e.target.value)
              }
              required
            />

            <input
              type="number"
              placeholder="Price"
              value={t.price}
              onChange={(e) =>
                handleTicketChange(index, "price", e.target.value)
              }
              required
            />

            <input
              type="number"
              placeholder="Quantity"
              value={t.quantity}
              onChange={(e) =>
                handleTicketChange(index, "quantity", e.target.value)
              }
              required
            />

          </div>
        ))}

        <button type="button" onClick={addTicket}>
          + Add Ticket
        </button>

        {/* 📷 IMAGE */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
        />

        {preview && (
          <img src={preview} alt="Preview" className="preview-image" />
        )}

        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}