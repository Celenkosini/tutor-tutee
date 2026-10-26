// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // will store { name, email, role }
  const [token, setToken] = useState(localStorage.getItem("jwt") || null);
  const [loading, setLoading] = useState(true); // Manages initial load/fetch

  // 1. Auto-fetch user when token changes (or on initial load if token exists)
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);

      if (!token) {
        localStorage.removeItem("jwt");
        localStorage.removeItem("role"); // Clearing role is good practice
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        localStorage.setItem("jwt", token);

        const res = await api.get("/api/auth/me");
        const { username, authorities } = res.data.data;

        const userData = {
          name: username,
          role: authorities, // Assuming 'authorities' is the role string (e.g., "TUTOR" or "TUTEE")
        };
        setUser(userData);
        localStorage.setItem("role", authorities);
      } catch (err) {
        console.error("Auth error:", err.message);
        setUser(null);
        localStorage.removeItem("jwt");
        localStorage.removeItem("role");
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  // 2. Login function (No changes needed)
  const login = async (email, password) => {
    const res = await api.post("/api/auth/login", { email, password });
    const payload = res.data.data || res.data;
    const newToken = payload.token || payload?.data?.token;

    if (!newToken) {
      throw new Error("Login failed: No token received.");
    }

    setToken(newToken);
    return payload;
  };

  // 3. Register function (No changes needed)
  const register = async (name, email, password, role) => {
    const res = await api.post("/api/auth/register", {
      name,
      email,
      password,
      role,
    });
    return res.data;
  };

  // 4. Logout function (No changes needed)
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("jwt");
    localStorage.removeItem("role");
  };

  const value = {
    user,
    token,
    // Use the role from 'user' state, which is updated by /me. Fallback to localStorage.
    role: user?.role || localStorage.getItem("role"),
    login,
    register,
    logout,
    loading,
  };

  // 5. Render children only after initial load is complete
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
