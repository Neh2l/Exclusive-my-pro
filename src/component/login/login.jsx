import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../Apis/Login";
import { ProductsContext } from "../../context/ProductsContext";
import { ToastContainer, toast } from "react-toastify";
import loginImg from "../../assets/images/loginimage.jpg";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  // const location = useLocation();
  const { setToken } = useContext(ProductsContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { token, role } = await loginUser({ email, password });
      setToken(token);
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      toast.success("Successfully logged in!", { position: "top-right", autoClose: 2000 });

      setTimeout(() => {
        navigate(role === "ADMIN" ? "/admin" : "/account");
      }, 2000);
    } catch (err) {
      setError(err.message || "Login failed");
      toast.error("Login failed! Please check your credentials.", { position: "top-right", autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* <div className="breadcrumb">
        <Link to="/">Home</Link> <span className="divider">/</span>
        <span className="active">{location.pathname.replace("/", "") || "Login"}</span>
      </div> */}
    <div className="login-wrapper">
      

      <div className="login-left">
        <img src={loginImg} alt="Login" />
      </div>

      <div className="login-right">
        <div className="login-card">
          <h2>Welcome Back</h2>
          <p>Log in to continue your journey</p>

          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />

            {error && <p className="error-text">{error}</p>}

           <div className="login-actions">
  <button type="submit" disabled={loading}>
    {loading ? "Logging in..." : "Log In"}
  </button>
  <Link to="/forgot-password" className="link-text">
    Forgot Password?
  </Link>
</div>

          </form>

          <p className="switch-text">
            Don’t have an account? <Link to="/signup" className="link-text">Sign Up</Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
    </div>
  );
};

export default Login;
