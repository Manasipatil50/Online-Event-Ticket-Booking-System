import React, { useEffect, useRef } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import API from "../services/api";

export default function PaymentPage() {
  const { bookingId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const verified = useRef(false);

  useEffect(() => {
    if (verified.current) return;
    verified.current = true;

    const paymentStatus = searchParams.get("link_status") || searchParams.get("order_status") || "SUCCESS";
    const paymentId = searchParams.get("link_id") || searchParams.get("order_id") || "CASHFREE_" + bookingId;

    const processPayment = async () => {
      try {
        await API.get(`/payment/verify/${bookingId}`, {
          params: { paymentStatus, paymentId }
        });

        alert("Payment Successful! Booking confirmed.");
        navigate("/dashboard/booking");
      } catch (err) {
        console.error(err);
        alert("Payment Failed and Booking aborted.");
        navigate("/dashboard/booking");
      }
    };
    processPayment();
  }, [bookingId, searchParams, navigate]);

  return <h2 style={{ textAlign: "center", marginTop: "100px", color: "blue" }}>💳 Verifying Payment. Please wait...</h2>;
} 