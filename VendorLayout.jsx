import React, { useEffect, useState } from "react";
import VendorSidebar from "./VendorSidebar";
import VendorNavbar from "./VendorNavbar";
import { Outlet } from "react-router-dom";
import API from "../services/api";
import "./VendorLayout.css";

export default function VendorLayout() {
  const [vendorName, setVendorName] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await API.get("/vendor/profile");
        setVendorName(res.data.name);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    }
    fetchProfile();
  }, []);

  return (
    <div className="vendor-layout">
      <VendorSidebar />
      <div className="main-area">
        <VendorNavbar vendorName={vendorName} />
        <div className="content-area">
          <Outlet />
        </div>
      </div>
    </div>
  );
}