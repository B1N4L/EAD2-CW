import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from 'react-icons/fa'; // Import icons
import { DEMO_MODE } from "../../demo/mode.js";
import { DEMO_LOGIN } from "../../demo/seed.js";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    }
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="card shadow-lg border-0 rounded-lg mt-5">
              <div className="card-header">
                <h3 className="text-center font-weight-light my-4">Employee Login</h3>
              </div>
              <div className="card-body">
                {DEMO_MODE && (
                  <div className="alert alert-info text-center small">
                    Demo login: <strong>{DEMO_LOGIN.email}</strong> / <strong>{DEMO_LOGIN.password}</strong>
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  {/* Email Input */}
                  <div className="form-floating mb-3">
                    <div className="input-group">
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
                  </div>

                  {/* Password Input */}
                  <div className="form-floating mb-3">
                    <div className="input-group">
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
                  </div>

                  {/* Error Message */}
                  {message && <div className="alert alert-danger text-center">{message}</div>}

                  {/* Submit Button */}
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary">
                      Sign In
                    </button>
                  </div>
                </form>
              </div>

              {/* Breach Button */}
              <div className="card-footer text-center py-3">
                <Link className="btn btn-outline-dark" to="/admin">
                  Breach
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
