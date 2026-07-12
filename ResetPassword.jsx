import { useState } from "react";
import axios from "axios";
import './resetPassword.css';

export default function ResetPassword({ email, otpFromBackend }) {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/users/reset-password",
        null,
        { params: { email, otp, newPassword } }
      );
      alert(res.data);
      setOtp("");
      setNewPassword("");
    } catch (err) {
      console.error(err);
      alert("Error resetting password");
    }
  };

  return (
<div className="reset-form-container">s
      <form onSubmit={handleReset}>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      <p>Your OTP has been sent to your email.</p>
    </div>
  );
} 