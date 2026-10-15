import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEnvelope, FaGlobeAsia, FaLock } from 'react-icons/fa'; // Import icons
import { DEMO_MODE } from "../../demo/mode.js";
import { DEMO_LOGIN } from "../../demo/seed.js";
import PoweredBy from "../../components/PoweredBy";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [signingIn, setSigningIn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSigningIn(true);
    try {
      const response = await axios.post("http://localhost:8081/employee-api/employees/login", {
        email,
        password,
      });

      if (response.status === 200) {
        navigate("/admin");
      }
    } catch (error) {
      setMessage("Invalid email or password");
    } finally {
      setSigningIn(false);
    }
  };

  return (
    <div className="auth-page d-flex align-items-center py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-5">
            <Link to="/home" className="d-inline-flex align-items-center gap-2 text-white text-decoration-none mb-3 opacity-75">
              <FaArrowLeft /> Back to site
            </Link>
            <div className="card auth-card">
              <div className="card-body p-4 p-lg-5">
                <div className="text-center mb-4">
                  <span className="brand-mark mb-3" style={{ width: "3rem", height: "3rem", fontSize: "1.4rem" }}>
                    <FaGlobeAsia />
                  </span>
                  <h1 className="h4 mb-1">Staff sign in</h1>
                  <p className="text-secondary small mb-0">Manage bookings, fleets, vehicles and staff.</p>
                </div>

                {DEMO_MODE && (
                  <div className="alert alert-info small text-center">
                    Demo login: <strong>{DEMO_LOGIN.email}</strong> / <strong>{DEMO_LOGIN.password}</strong>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Email Input */}
                  <label htmlFor="email" className="form-label">Email</label>
                  <div className="input-group mb-3">
                    <span className="input-group-text"><FaEnvelope /></span>
                    <input
                      required
                      autoComplete="off"
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  {/* Password Input */}
                  <label htmlFor="password" className="form-label">Password</label>
                  <div className="input-group mb-3">
                    <span className="input-group-text"><FaLock /></span>
                    <input
                      required
                      autoComplete="off"
                      type="password"
                      id="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  {/* Error Message */}
                  {message && <div className="alert alert-danger text-center small">{message}</div>}

                  {/* Submit Button */}
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-lg" disabled={signingIn}>
                      {signingIn ? "Signing in…" : "Sign in"}
                    </button>
                  </div>
                </form>

                {/* Breach: straight to the dashboard without signing in */}
                <div className="text-center mt-3">
                  <Link className="small text-secondary" to="/admin">
                    Skip sign-in
                  </Link>
                </div>
              </div>
            </div>
            <PoweredBy className="text-center text-white-50 mt-3" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
