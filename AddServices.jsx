import React, { useState } from "react";
import axios from "axios";

export default function AddService({ eventId }) {
  const [service, setService] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setService({ ...service, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8080/api/service/add?eventId=${eventId}`,
        service
      );
      setMessage(`Service "${res.data.name}" added successfully!`);
    } catch (err) {
      console.error(err);
      setMessage("Failed to add service.");
    }
  };

  return (
    <div>
      <h2>Add Service/Product</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Service Name" onChange={handleChange} />
        <input name="price" placeholder="Price" type="number" onChange={handleChange} />
        <input name="description" placeholder="Description" onChange={handleChange} />
        <button type="submit">Add Service</button>
      </form>
    </div>
  );
} 