import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Register from "../../Apis/Register";
import signupImg from "../../assets/images/register.jpg";
import "./signup.css";

export default function Signup() {
  // const location = useLocation();
  const nameRef = useRef();
  const genderRef = useRef();
  const addressRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState({});

  const validate = (data) => {
    const newErrors = {};
    if (!data.name) newErrors.name = "Name is required";
    if (!data.gender) newErrors.gender = "Gender is required";
    if (!data.address) newErrors.address = "Address is required";
    if (!data.email.includes("@")) newErrors.email = "Email is invalid";
    if (data.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      name: nameRef.current.value,
      gender: genderRef.current.value,
      address: addressRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    const validationErrors = validate(userData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const response = await Register(userData);
      if (response) {
        alert("Registered successfully!");
        nameRef.current.value = "";
        genderRef.current.value = "";
        addressRef.current.value = "";
        emailRef.current.value = "";
        passwordRef.current.value = "";
      } else alert("Registration failed!");
    }
  };

  return (
    <div>
      {/* Breadcrumb */}
      {/* <div className="breadcrumb">
        <Link to="/">Home</Link> <span className="divider">/</span>
        <span className="active">{location.pathname.replace("/", "") || "Signup"}</span>
      </div> */}
      <div className="signup-wrapper">
        <div className="signup-left">
          <img src={signupImg} alt="Register" />
        </div>

        <div className="signup-right">
          <div className="signup-card">
            <h2>Create an Account</h2>
            <p>Enter your details to get started</p>

            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Full Name" ref={nameRef} />
              {errors.name && <p className="error-text">{errors.name}</p>}

              <select ref={genderRef}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && <p className="error-text">{errors.gender}</p>}

              <input type="text" placeholder="Address" ref={addressRef} />
              {errors.address && <p className="error-text">{errors.address}</p>}

              <input type="email" placeholder="Email address" ref={emailRef} />
              {errors.email && <p className="error-text">{errors.email}</p>}

              <input type="password" placeholder="Password" ref={passwordRef} />
              {errors.password && (
                <p className="error-text">{errors.password}</p>
              )}

              <div className="signup-actions">
                <button type="submit">Create Account</button>
                <Link to="/reemail" className="link-text">
                  Resend
                </Link>
              </div>
            </form>

            <p className="switch-text">
              Already have an account?{" "}
              <Link to="/login" className="link-text">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
