import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("TUTEE");
  const { register } = useAuth();
  const nav = useNavigate();
  const [err, setErr] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);
    try {
      await register(name, email, password, role);
      nav("/login");
    } catch (error) {
      setErr(error.message || "Registration failed");
    }
  };

  return (
    <div className="authcard">
      <h2>Register</h2>
      {err && <div className="error">{err}</div>}
      <form onSubmit={submit}>
        <input
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="TUTEE">Tutee (Learner)</option>
          <option value="TUTOR">Tutor</option>
        </select>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn--primary" type="submit">
            Register
          </button>
          <a href="/" className="btn btn--ghost">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
