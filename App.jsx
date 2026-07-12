// src/App.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// --- Public Pages ---
import Welcome from "./pages/Welcome.jsx";
import About from "./pages/About.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// --- User Pages ---
import UserDashboard from "./pages/UserDashboard.jsx";
import Profile from "./pages/Profile.jsx";
import UserBooking from "./pages/UserBooking.jsx";
import Settings from "./pages/Settings.jsx";
import UserWishlist from "./pages/UserWishlist.jsx";
import AllEvents from "./pages/AllEvents.jsx"; // ✅ keep only this
import UserLayout from "./components/UserLayout.jsx";
import UserHome from "./pages/UserHome.jsx";
import BookingForm from "./pages/BookingForm.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";

// --- Admin Pages ---
import AdminDashboard from "./pages/AdminDashboard.jsx";
import UsersPage from "./pages/UsersPage.jsx";
import AdminVendors from "./pages/AdminVendors.jsx";
import AdminEvents from "./pages/AdminEvents.jsx";
import AdminPayments from "./pages/AdminPayments.jsx";
import AdminBookings from "./pages/AdminBookings.jsx";


// --- Vendor Pages ---
import VendorDashboard from "./pages/VendorDashboard.jsx";
import VendorEvents from "./pages/VendorEvents.jsx";
import CreateEvent from "./pages/CreateEvent.jsx";
import EditEvent from "./pages/EditEvent.jsx";
import VendorLayout from "./components/VendorLayout.jsx";
import VendorProfile from "./pages/VendorProfile.jsx";
import VendorEarnings from "./pages/VendorEarnings.jsx";
import VendorBookings from "./pages/VendorBookings.jsx";



// --- Components ---
import PublicNavbar from "./components/PublicNavbar.jsx";
import AdminNavbar from "./components/AdminNavbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  const [role, setRole] = useState(localStorage.getItem("role"));
  const location = useLocation();

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, [location]);

  const path = location.pathname;
  const publicPages = ["/", "/welcome", "/about", "/login", "/register"];

  return (
    <>
      {/* Navbar Logic */}
      {role === "ADMIN" ? (
        <AdminNavbar />
      ) : publicPages.includes(path) ? (
        <PublicNavbar />
      ) : null}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Welcome />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/payment-status/:bookingId" element={<PaymentPage />} />

        {/* Vendor Routes */}
        <Route
          path="/vendor"
          element={
            <ProtectedRoute vendorRequired={true}>
              <VendorLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<VendorDashboard />} />
          <Route path="dashboard" element={<VendorDashboard />} />
          <Route path="events" element={<VendorEvents />} />
<Route path="bookings" element={<VendorBookings />} /> ✅
          <Route path="profile" element={<VendorProfile />} />
          <Route path="create-event" element={<CreateEvent />} />
          <Route path="edit-event/:id" element={<EditEvent />} />
          <Route path="earnings" element={<VendorEarnings />} />
        </Route>

        {/* User Routes */}
        {/* User Routes */}
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <UserLayout />
    </ProtectedRoute>
  }
>
  {/* Home page: Upcoming events */}
  <Route index element={<UserHome />} />
  {/* User dashboard shortcuts */}
  <Route path="dashboard" element={<UserDashboard />} />
  {/* Profile, Booking, Settings */}
  <Route path="profile" element={<Profile />} />
  <Route path="booking" element={<UserBooking />} />
  <Route path="settings" element={<Settings />} />
  {/* Events Pages */}
<Route path="allevents" element={<AllEvents />} />
  <Route path="wishlist" element={<UserWishlist />} />    {/* Wishlist */}
  <Route path="bookingform" element={<BookingForm />} />  {/* Booking modal/page */}
</Route>

        {/* Admin Routes */}
        <Route
          path="/admindashboard"
          element={
            <ProtectedRoute adminRequired={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/vendors" element={<AdminVendors />} />
        <Route path="/bookings" element={<AdminBookings />} /> {/* Fixed */}
        <Route path="/events" element={<AdminEvents />} />
        <Route path="/payments" element={<AdminPayments />} />
        <Route path="/reports" element={<div>Reports Page</div>} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
}

export default App;