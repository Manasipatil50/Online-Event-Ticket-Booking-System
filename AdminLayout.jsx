// src/components/admin/AdminLayout.jsx
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";
import "./AdminLayout.css";

export default function AdminLayout() {
  return (
    <>
      <AdminNavbar />

      <div className="admin-layout">
        <AdminSidebar />
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </>
  );
}