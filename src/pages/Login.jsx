// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      // After successful login, redirect to /Dashboard.
      // The ProtectedDashboard in App.jsx will handle the check
      // for TUTOR role and whether the profile needs to be set up.
      nav("/Dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="authcard">
      {/* ... (rest of the component remains the same) */}
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={submit}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn--primary" type="submit">
            Login
          </button>
          <a href="/register" className="btn btn--ghost">
            Register
          </a>
        </div>
      </form>
    </div>
  );
}
