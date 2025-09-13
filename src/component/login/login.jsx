import React, { use, useContext, useRef, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { loginUser } from "../../Apis/Login";
import "./login.css";
import { ProductsContext } from "../../context/ProductsContext";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setToken } = useContext(ProductsContext);


  const logout = useRef();
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { token, role } = await loginUser({email, password});

      

      setToken(token);
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      

   
      toast.success("Successfully logged in!", {
        position: "top-right",
        autoClose: 2000,
      });

      setTimeout(() => {
        if (role === "ADMIN") navigate("/admin");
        else navigate("/account");
      }, 2000);
    } catch (err) {
      console.error(err);
      setError(err.message || "Login failed");

   
      toast.error("Login failed! Please check your credentials.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const ProtectedAdminRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "ADMIN") {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <div className="login">
      <div className="login-img">
        <img src="/public/loginimage.jpg" alt="loginimg" />
      </div>
      <div className="login-container">
        <p>Log in to Exclusive</p>
        <p>Enter your details below</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            required
            placeholder="Email or Phone Number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="login-actions">
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </button>

            <a href="/forgot-password" className="forgot-link">
              Forgot Password?
            </a>

          </div>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
