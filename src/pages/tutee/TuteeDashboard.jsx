import React from "react";

export default function TuteeDashboard({ user }) {
  // Destructure the name from the user object for a cleaner display
  const { name, subscription_tier } = user;

  return (
    <div className="dashboard-content">
      <h2 className="welcome-header">👋 Welcome back, {name}!</h2>
      <p>
        Your current subscription tier: <strong>{subscription_tier}</strong>
      </p>

      {/* TODO: Add Tutor Search (Section 2.A) */}
      <section className="dashboard-section">
        <h3>Find Your Next Tutor</h3>
        <p>[Tutor Search Component will go here]</p>
      </section>

      {/* TODO: Add My Sessions Table (Section 2.B) */}
      <section className="dashboard-section">
        <h3>My Sessions</h3>
        <p>[My Sessions Table Component will go here]</p>
      </section>
    </div>
  );
}
