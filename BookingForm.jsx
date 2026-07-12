// src/components/BookingForm.jsx
import React, { useState } from "react";
import API from "../services/api";
import "./BookingForm.css";

function BookingForm({ event, onClose }) {
  const [tickets, setTickets] = useState(1);
  const [bookingId, setBookingId] = useState(null);
  const [otp, setOtp] = useState("");
  const [paymentLink, setPaymentLink] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // Authentication is handled automatically by api.jsx interceptor

  // 1️⃣ Create booking and request OTP
 const handleBooking = async () => {
  setLoading(true);
  try {
    const res = await API.post(`/bookings/${event.id}`, {
      ticketId: event.tickets[0].id,
      quantity: tickets
    });

    const newBookingId = res.data.bookingId;
    setBookingId(newBookingId);

    await API.post("/bookings/request-otp", { bookingId: newBookingId });

    setOtpSent(true);
    alert("OTP sent!");
  } catch (err) {
    console.error(err.response || err);
  } finally {
    setLoading(false);
  }
};

  // 2️⃣ Verify OTP and get payment link
  const handleVerifyOTP = async () => {
    if (!bookingId || !otp) {
      alert("Booking ID or OTP missing!");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        bookingId: Number(bookingId),
        otp: otp.toString().trim(),
      };

      const res = await API.post("/bookings/verify-otp", payload);

      if (res.data.success && res.data.paymentLink) {
        setPaymentLink(res.data.paymentLink);
        alert("OTP verified! Redirecting to payment page...");
        window.open(res.data.paymentLink, "_blank");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error("OTP verification error:", err.response || err);
      alert(err.response?.data?.message || "OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-modal-overlay">
      <div className="booking-modal-card">
        <button className="booking-close-btn" onClick={onClose}>✖</button>
        <div className="booking-header">
          <h2>Reserve Your Spot</h2>
          <p className="booking-event-title">{event.name}</p>
        </div>

        {/* Step 1: Booking */}
        {!bookingId && (
          <div className="booking-step">
            <div className="booking-form-group">
              <label>Number of Tickets</label>
              <div className="ticket-counter">
                <button type="button" onClick={() => setTickets(Math.max(1, tickets - 1))}>-</button>
                <input
                  type="number"
                  min="1"
                  readOnly
                  value={tickets}
                />
                <button type="button" onClick={() => setTickets(tickets + 1)}>+</button>
              </div>
            </div>
            <button className="booking-action-btn primary-gradient" onClick={handleBooking} disabled={loading}>
              {loading ? <span className="booking-loader"></span> : "Proceed to Checkout"}
            </button>
          </div>
        )}

        {/* Step 2: OTP verification */}
        {bookingId && otpSent && !paymentLink && (
          <div className="booking-step">
            <div className="booking-form-group">
              <label>Authentication OTP</label>
              <p className="booking-otp-text">A one-time code has been emailed to you.</p>
              <input
                type="text"
                className="booking-otp-input"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 4-digit code"
                maxLength="4"
              />
            </div>
            <button className="booking-action-btn verify-gradient" onClick={handleVerifyOTP} disabled={loading}>
              {loading ? <span className="booking-loader"></span> : "Verify Identity"}
            </button>
          </div>
        )}

        {/* Step 3: Payment link */}
        {paymentLink && (
          <div className="booking-step success-step">
            <div className="booking-success-icon">✓</div>
            <h3>Authentication Successful</h3>
            <p>Your payment session has been generated securely.</p>
            <a
              href={paymentLink}
              target="_blank"
              rel="noopener noreferrer"
              className="booking-action-btn pay-gradient"
            >
              Complete Payment Now
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingForm;