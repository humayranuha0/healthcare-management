import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
  });
  const [error, setError] = useState("");

  

  
  useEffect(() => {
    if (location.pathname === "/register") {
      setIsLogin(false);
    } else if (location.pathname === "/login") {
      setIsLogin(true);
    }
  }, [location.pathname]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        
        const res = await axios.post("http://localhost:3000/api/login", {
          email: formData.email,
          password: formData.password,
        });

        if (res.data?.user) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));

          const userRole = res.data.user.role;
          if (userRole === "admin") {
            navigate("/admin");
          } else if (userRole === "doctor") {
            navigate("/doctors");
          } else {
            navigate("/patients");
          }
        }
      } else {
        
        
        const res = await axios.post("http://localhost:3000/api/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role, 
        });
        if (res.data?.user) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));

          const userRole = res.data.user.role;
          if (userRole === "admin") {
            navigate("/admin");
          } else if (userRole === "doctor") {
            navigate("/doctors");
          } else {
            navigate("/patients");
          }
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card border-0 shadow-lg p-4 rounded-4">
            <h3 className="fw-bold text-center text-primary mb-3">
              {isLogin ? "Welcome Back!" : "Create an Account"}
            </h3>

            {error && <div className="alert alert-danger py-2">{error}</div>}

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      className="form-control"
                      placeholder="John Doe"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">I am a:</label>
                    <select
                      name="role"
                      className="form-select"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option value="patient">Patient</option>
                      <option value="doctor">Doctor</option>
                    </select>
                  </div>
                </>
              )}

              <div className="mb-3">
                <label className="form-label fw-semibold">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  className="form-control"
                  placeholder="name@example.com"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  className="form-control"
                  placeholder="••••••••"
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 rounded-pill"
              >
                {isLogin ? "Login" : "Register"}
              </button>
            </form>

            <div className="text-center mt-3">
              <small className="text-muted">
                {isLogin
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <button
                  type="button"
                  className="btn btn-link p-0 text-decoration-none fw-bold"
                  onClick={() => navigate(isLogin ? "/register" : "/login")}
                >
                  {isLogin ? "Register Here" : "Login Here"}
                </button>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
