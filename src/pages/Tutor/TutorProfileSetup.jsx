// src/pages/Tutor/TutorProfileSetup.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";

export default function TutorProfileSetup() {
  const { user, token, logout } = useAuth();
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State for TutorProfileDto fields
  const [bio, setBio] = useState("");
  const [subjects, setSubjects] = useState(""); // Comma-separated for simplicity
  const [hourlyRate, setHourlyRate] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");

  // Redirect if not a tutor or not logged in
  useEffect(() => {
    if (!token || user?.role !== "TUTOR") {
      nav("/", { replace: true });
    }
  }, [user, token, nav]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Prepare DTO payload
    const payload = {
      bio,
      subjects: subjects
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean), // Array of subjects
      hourlyRateCents: parseInt(hourlyRate) * 100 || 0, // Convert to cents
      city,
      country,
      profileImageUrl,
      // availability and other fields can be added later or defaulted in DTO/backend
    };

    try {
      await api.post("/api/tutors/profile", payload);
      // Success: Redirect to Dashboard
      nav("/Dashboard", { replace: true });
    } catch (err) {
      console.error("Profile setup failed:", err);
      setError(
        err.response?.data?.message ||
          "Failed to save profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (user?.role !== "TUTOR") {
    return null; // Don't render if not a tutor
  }

  return (
    <div className="authcard">
      <h2>Complete Tutor Profile 🧑‍🏫</h2>
      <p>Please provide essential details to start tutoring.</p>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Profile Image URL (Optional)"
          value={profileImageUrl}
          onChange={(e) => setProfileImageUrl(e.target.value)}
        />
        <textarea
          placeholder="Bio (e.g., teaching experience, style)"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          required
        />
        <input
          placeholder="Subjects (e.g., Math, Physics, English - comma separated)"
          value={subjects}
          onChange={(e) => setSubjects(e.target.value)}
          required
        />
        <input
          placeholder="Hourly Rate (e.g., 25 - in local currency)"
          type="number"
          min="0"
          value={hourlyRate}
          onChange={(e) => setHourlyRate(e.target.value)}
          required
        />
        <input
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <input
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
        <button className="btn btn--primary" type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Profile and Continue"}
        </button>
      </form>
    </div>
  );
}
