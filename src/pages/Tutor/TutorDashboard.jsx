import React from "react";

export default function TutorDashboard({ user }) {
  return (
    <div className="dashboard-content">
      <h2 className="welcome-header">🧑‍🏫 Tutor Dashboard for {user.name}</h2>
      <p>Your profile status: [Verification Status]</p>

      {/* TODO: Add Incoming Requests */}
      <section className="dashboard-section">
        <h3>Incoming Session Requests</h3>
        <p>[Incoming Requests Table Component will go here]</p>
      </section>

      {/* TODO: Link to Profile Setup */}
      <section className="dashboard-section">
        <h3>Profile & Availability</h3>
        <p>Set up or update your profile details and hourly rate.</p>
        <button>Update Profile</button>
      </section>
    </div>
  );
}
