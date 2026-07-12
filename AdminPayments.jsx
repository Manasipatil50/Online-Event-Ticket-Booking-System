import React, { useEffect, useState } from "react";
import API from "../services/api";
//import "./AdminPayments.css";

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState("");
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    async function fetchPayments() {
      try {
        const res = await API.get("/admin/bookings");
        
        // Filter out bookings without payments
        const data = res.data.filter(b => b.totalPrice && b.totalPrice > 0);
        
        // Sort by date descending
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        setPayments(data);
        
        // Set total revenue roughly matching stats
        const rev = data.reduce((sum, b) => sum + b.totalPrice, 0);
        setTotalRevenue(rev);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    }
    fetchPayments();
  }, []);

  const filteredPayments = payments.filter((b) =>
    (b.user?.email || "").toLowerCase().includes(search.toLowerCase()) ||
    (b.event?.name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-payments-container">
      <h2>Revenue & Payments</h2>
      
      <div className="revenue-summary">
         <h3>Total Revenue: <span className="revenue-amount">₹ {totalRevenue}</span></h3>
      </div>

      <input
        type="text"
        placeholder="Search by customer email or event name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-box"
      />

      <div className="table-container">
        <table className="payments-table">
          <thead>
            <tr>
              <th>Txn ID</th>
              <th>Customer</th>
              <th>Event</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.length > 0 ? (
              filteredPayments.map((b) => (
                <tr key={b.id}>
                  <td>#TXN-{b.id}</td>
                  <td>{b.user?.email || "N/A"}</td>
                  <td>{b.event?.name || "N/A"}</td>
                  <td className="amount">₹ {b.totalPrice}</td>
                  <td className={`status ${b.status?.toLowerCase() || ''}`}>
                    {b.status || 'UNKNOWN'}
                  </td>
                  <td>{b.createdAt ? new Date(b.createdAt).toLocaleString() : 'N/A'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">
                  No payment records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
