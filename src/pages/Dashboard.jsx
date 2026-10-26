import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import Tutors from "./Tutor/Tutors";
import TutorDashboard from "./Tutor/TutorDashboard";
import AdminDashboard from "./admin/AdminDashboard";

export default function Dashboard() {
  // Pull the loading state from the context
  const { user, token, loading } = useAuth();

  // 1. Loading State Check (Crucial for waiting after login)
  if (loading) {
    return (
      <main className="dashboard-page">
        <p>Authenticating user data and determining role...</p>
      </main>
    );
  }

  // 2. Redirect if not logged in (executed after loading is complete)
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 3. Get the role (guaranteed to be available or null if token is present)
  const role = user?.role;

  // Safety check in case the token is valid but the /me endpoint returned no role
  if (!role) {
    return (
      <main className="dashboard-page">
        <p>
          User data loaded, but role is missing. Please log out and try again.
        </p>
      </main>
    );
  }

  // 4. Render the correct dashboard based on role
  const renderDashboard = () => {
    switch (role) {
      case "TUTEE":
        return <Tutors user={user} />;
      case "TUTOR":
        return <TutorDashboard user={user} />;
      case "ADMIN":
        return <AdminDashboard user={user} />;
      default:
        // This should not be hit if your role strings are consistent
        return <p>Invalid user role detected: {role}</p>;
    }
  };

  return <main className="dashboard-page">{renderDashboard()}</main>;
}
