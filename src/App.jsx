// src/App.jsx
import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import api from "./api/axios";
import Landing from "./pages/Landing";
import Tutors from "./pages/Tutor/Tutors";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NavBar from "./pages/nav/NavBar";
// New Import
import TutorProfileSetup from "./pages/Tutor/TutorProfileSetup"; // <--- NEW IMPORT

export default function App() {
  const { user, token, logout, loading, role } = useAuth(); // Destructure 'role' and 'loading'
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // ... (handleLogout remains the same)

  const isLoggedIn = !!token;

  // NEW: A component to check if a tutor profile exists before rendering the main dashboard
  const ProtectedDashboard = () => {
    if (loading) return <div>Loading...</div>; // Show a loader while checking auth

    if (!isLoggedIn) return <Navigate to="/login" replace />;

    // If user is a TUTOR, check if profile exists, otherwise go to Dashboard
    if (role === "TUTOR") {
      return <TutorProfileCheck />;
    }

    // Tutees go straight to Dashboard
    return <Dashboard />;
  };

  // NEW: Logic to check profile existence
  const TutorProfileCheck = () => {
    const [profileExists, setProfileExists] = useState(null); // null means checking
    const { token } = useAuth();

    useEffect(() => {
      const check = async () => {
        if (!token) {
          setProfileExists(false); // Should be handled by ProtectedDashboard, but good check
          return;
        }
        try {
          // Use the new endpoint to check if a profile exists
          const res = await api.get("/api/tutors/profile/exists");
          setProfileExists(res.data.data); // Assuming response is { success: true, data: boolean }
        } catch (error) {
          console.error("Error checking profile:", error);
          // Assume profile doesn't exist on error, or redirect to login/error page
          setProfileExists(false);
        }
      };
      check();
    }, [token]);

    if (profileExists === null) {
      return <div>Checking tutor profile status...</div>;
    }

    if (profileExists === false) {
      // Profile doesn't exist, redirect to setup page
      return <Navigate to="/setup-profile" replace />;
    }

    // Profile exists, go to Dashboard
    return <Dashboard />;
  };

  return (
    <div className="app">
      <NavBar />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* NEW ROUTE FOR PROFILE SETUP */}
        <Route
          path="/setup-profile"
          element={
            token ? <TutorProfileSetup /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/tutors"
          element={token ? <Tutors /> : <Navigate to="/login" replace />}
        />

        {/* USE THE PROTECTED DASHBOARD CHECKER */}
        <Route path="/Dashboard" element={<ProtectedDashboard />} />
      </Routes>
    </div>
  );
}
