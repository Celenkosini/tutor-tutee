import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, token, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = !!token;
  const role = user?.role;
  const name = user?.name || user?.username || user?.email;

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="brand">TutorTutee</div>

      {/* Hamburger */}
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>
          Home
        </Link>

        {/* Tutee exclusive */}
        {(!role || role === "TUTEE") && (
          <Link to="/tutors" onClick={() => setMenuOpen(false)}>
            Find Tutors
          </Link>
        )}

        {/* Tutor exclusive */}
        {role === "TUTOR" && (
          <Link to="/my-sessions" onClick={() => setMenuOpen(false)}>
            My Sessions
          </Link>
        )}

        {/* Admin exclusive */}
        {role === "ADMIN" && (
          <Link to="/admin" onClick={() => setMenuOpen(false)}>
            Admin Panel
          </Link>
        )}

        {/* All logged in */}
        {isLoggedIn && (
          <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
            Dashboard
          </Link>
        )}

        {!isLoggedIn ? (
          <>
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
            <Link
              to="/register"
              onClick={() => setMenuOpen(false)}
              className="signup-btn"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <span className="username">Hi, {name}</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
