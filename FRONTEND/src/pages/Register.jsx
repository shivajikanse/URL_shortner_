"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";

import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../lib/ueser.api.js";
import {
  startLoading,
  loginSuccess,
  authFail,
} from "../redux/slices/authSlice";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = form;

    dispatch(startLoading());

    try {
      const data = await registerUser(name, email, password);

      dispatch(loginSuccess({ user: data.user, token: data.token }));

      navigate("/home");
    } catch (err) {
      dispatch(authFail(err.response?.data?.message || "Registration failed"));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Create Account</h1>
          <p>Join us to shorten your URLs</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-alert">{error}</div>}

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="auth-link">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
