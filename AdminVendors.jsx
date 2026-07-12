import React, { useEffect, useState } from "react";
import API from "../services/api";
import "./AdminVendors.css";

function AdminVendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchVendors = async () => {
    try {
      const res = await API.get("/admin/vendors");
      setVendors(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const handleApprove = async (id) => {
    try {
      await API.put(`/admin/approve-vendor/${id}`);
      alert("✅ Vendor Approved");
      fetchVendors();
    } catch (err) {
      alert("❌ Approval Failed");
    }
  };

  const handleReject = async (id) => {
    try {
      await API.put(`/admin/reject-vendor/${id}`);
      alert("✅ Vendor Rejected");
      fetchVendors();
    } catch (err) {
      alert("❌ Rejection Failed");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete vendor?")) {
      try {
        await API.delete(`/admin/vendor/${id}`);
        alert("🗑️ Deleted");
        fetchVendors();
      } catch (err) {
        alert("❌ Delete Failed");
      }
    }
  };

  // 🔍 FILTER
  const filteredVendors = vendors.filter((v) =>
    v.email?.toLowerCase().includes(search.toLowerCase()) ||
    v.companyName?.toLowerCase().includes(search.toLowerCase()) ||
    v.name?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Loading vendors...</p>;

  return (
    <div className="admin-vendors-page">
      <h2>Vendors Management</h2>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search by name, email, company..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-box"
      />

      <table className="vendors-table">
        <thead>
          <tr>
            <th>Name / Company</th>
            <th>Email</th>
            <th>Phone</th>
            <th>GST</th>
            <th>Status</th>
            <th>Registered</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredVendors.length > 0 ? (
            filteredVendors.map((vendor) => (
              <tr key={vendor.id}>
                <td>{vendor.companyName || vendor.name}</td>
                <td>{vendor.email}</td>
                <td>{vendor.phone || "N/A"}</td>
                <td>{vendor.gstNumber}</td>

                {/* 🔥 Status color */}
                <td className={`status ${vendor.status.toLowerCase()}`}>
                  {vendor.status}
                </td>

                <td>
                  {vendor.createdAt
                    ? new Date(vendor.createdAt).toLocaleDateString()
                    : "N/A"}
                </td>

                <td>
                  {vendor.status === "PENDING" && (
                    <>
                      <button
                        className="approve-btn"
                        onClick={() => handleApprove(vendor.id)}
                      >
                        Approve
                      </button>
                      <button
                        className="reject-btn"
                        onClick={() => handleReject(vendor.id)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(vendor.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="no-data">
                No vendors found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminVendors; 