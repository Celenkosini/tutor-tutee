import React from "react";

export default function AdminDashboard({ user }) {
  return (
    <div className="dashboard-content">
      <h2 className="welcome-header">👑 Admin Panel for {user.name}</h2>
      <p>Role: System Administrator</p>

      {/* TODO: Verification Queue */}
      <section className="dashboard-section">
        <h3>Pending Tutor Verification</h3>
        <p>[Table for /api/admin/tutors/pending will go here]</p>
      </section>

      {/* TODO: Metrics */}
      <section className="dashboard-section">
        <h3>Platform Metrics</h3>
        <p>[Metrics component using /api/admin/metrics will go here]</p>
      </section>
    </div>
  );
}
