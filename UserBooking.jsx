import React, { useEffect, useState } from "react";
import API from "../services/api";
import "./UserBooking.css";

export default function UserBookings() {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await API.get("/bookings/my");
        setBookings(res.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);

        if (error.response?.status === 403) {
          alert("Unauthorized! Please login again.");
        } else {
          alert("Failed to load bookings");
        }
      }
    }

    fetchBookings();
  }, []);

  return (
    <div className="bookings-dashboard">
      <div className="bookings-header">
        <h2>My Event Bookings</h2>
        <p>Manage and track all your reserved event tickets</p>
      </div>

      {bookings.length === 0 ? (
        <div className="empty-bookings">
          <div className="empty-icon">🎟️</div>
          <h3>No bookings found</h3>
          <p>You haven't reserved tickets yet.</p>
        </div>
      ) : (
        <div className="bookings-grid">
          {bookings.map((booking) => {

            const isConfirmed =
              booking.paymentStatus === "PAID" ||
              booking.status === "CONFIRMED";

            const quantity = booking.quantity || 1;
            const price = booking.totalPrice || 0;
            const total = quantity * price;

            return (
              <div className="booking-card" key={booking.id}>

                <div className="booking-card-header">
                  <span className="booking-id">ORDER #{booking.id}</span>

                  <span className={`booking-status ${isConfirmed ? 'status-paid' : 'status-pending'}`}>
                    {booking.paymentStatus || booking.status}
                  </span>
                </div>

                <div className="booking-card-body">
                  <h3 className="booking-event-name">
                    {booking.event?.name || "Unknown Event"}
                  </h3>

                  <div className="booking-details">

                    <div className="detail-row">
                      <span className="detail-label">Date</span>
                      <span className="detail-value">
                        {booking.bookingDate
                          ? new Date(booking.bookingDate).toLocaleDateString()
                          : 'N/A'}
                      </span>
                    </div>

                    {/* ✅ NEW: Ticket Type */}
                    <div className="detail-row">
                      <span className="detail-label">Ticket</span>
                      <span className="detail-value">
                        {booking.ticket?.type || "Standard"}
                      </span>
                    </div>

                    {/* ✅ FIXED: Quantity */}
                    <div className="detail-row">
                      <span className="detail-label">Quantity</span>
                      <span className="detail-value">{quantity}</span>
                    </div>

                    {/* ✅ FIXED: Total */}
                    <div className="detail-row total-row">
                      <span className="detail-label">Total Amount</span>
                      <span className="detail-value price">
                        ₹{total.toFixed(2)}
                      </span>
                    </div>

                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}