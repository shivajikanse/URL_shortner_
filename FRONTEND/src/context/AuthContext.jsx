"use client";

import { createContext, useEffect, useMemo, useState } from "react";
import axios from "axios";

export const AuthContext = createContext({
  token: null,
  user: null,
  login: () => {},
  logout: () => {},
});

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(() =>
    typeof window !== "undefined" ? localStorage.getItem("token") : null
  );

  const [user, setUser] = useState(() =>
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null
  );

  // ✅ Attach Authorization header automatically
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common.Authorization;
    }
  }, [token]);

  // ✅ Login function
  const login = (jwt, userObj) => {
    setToken(jwt);
    setUser(userObj);
    localStorage.setItem("token", jwt);
    localStorage.setItem("user", JSON.stringify(userObj));
  };

  // ✅ Logout
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const value = useMemo(() => ({ token, user, login, logout }), [token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
