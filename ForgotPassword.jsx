import { useState } from "react";
import axios from "axios";
import ResetPassword from "./ResetPassword";
import "./ForgotPassword.css";


export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [showReset, setShowReset] = useState(false);
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8080/api/users/forgot-password?email=${email}`
      );
      setOtp(res.data.token); // OTP received from backend
      setShowReset(true);
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert("Error sending OTP");
    }
  };

  return (
    <div className="forgot-form-container">
      {!showReset ? (
        <>
          <h2>Forgot Password</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Send OTP</button>
          </form>
        </>
      ) : (
        <ResetPassword email={email} otpFromBackend={otp} />
      )}
    </div>
  );
} 