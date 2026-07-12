import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    role: "USER",
    companyName: "",
    businessAddress: "",
    gstNumber: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ PASSWORD VALIDATION
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(form.password)) {
      setError("Password must have uppercase, lowercase, number & 6+ chars");
      return;
    }

    setError("");

    const payload = {
      name: form.fullName,
      email: form.email,
      password: form.password,
      phone: form.phone,
      role: form.role,
      companyName: form.companyName,
      businessAddress: form.businessAddress,
      gstNumber: form.gstNumber
    };

    try {
      await API.post("/auth/register", payload);
      alert("Registered Successfully");
      navigate("/login");
    } catch {
      alert("Registration Failed");
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">

        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>

          <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required />

          <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required />

          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />

          {/* 🔥 ERROR MESSAGE */}
          {error && <p className="error">{error}</p>}

          <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} />

          <select name="role" onChange={handleChange}>
            <option value="USER">USER</option>
            <option value="VENDOR">VENDOR</option>
          </select>

          {form.role === "VENDOR" && (
            <>
              <input name="companyName" placeholder="Company Name" onChange={handleChange} />
              <input name="businessAddress" placeholder="Business Address" onChange={handleChange} />
              <input name="gstNumber" placeholder="GST Number" onChange={handleChange} />
            </>
          )}

          <button type="submit">Register</button>
        </form>

        <p>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>

      </div>
    </div>
  );
}

export default Register; 