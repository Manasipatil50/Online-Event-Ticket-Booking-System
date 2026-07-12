// src/components/admin/AdminSidebar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Store,
  Calendar,
  TicketCheck,
  CreditCard,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import "./AdminSidebar.css";

export default function AdminSidebar() {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);

 const menu = [
  { name: "Dashboard", path: "/admindashboard" },
  { name: "Vendors", path: "/vendors" },
{ name: "Bookings", path: "/bookings" },
  { name: "Payments", path: "/payments" },
];

  return (
    <aside className={`admin-sidebar ${collapsed ? "collapsed" : ""}`}>
      
      <div className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </div>

      <ul className="sidebar-menu">
        {menu.map((item) => (
          <li
            key={item.path}
            className={pathname === item.path ? "active" : ""}
          >
            <Link to={item.path}>
              <span className="icon">{item.icon}</span>
              {!collapsed && <span>{item.name}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}