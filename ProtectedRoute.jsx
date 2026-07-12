import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, getRole } from "../utils/auth";

export default function ProtectedRoute({ children, adminRequired = false }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (adminRequired && getRole() !== "ADMIN") {
    alert("❌ Admin access required!");
    return <Navigate to="/" replace />;
  }

  return children;
}