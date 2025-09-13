import { useRef, useState } from "react";
import "./signup.css";
import signup_img from "./../../assets/images/register.jpg";
import { Link, useLocation } from "react-router-dom";
import Register from "./../../Apis/Register";

export default function Signup() {
  const nameRef = useRef();
  const genderRef = useRef();
  const addressRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const location = useLocation();
 



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

    console.log(userData)

    const validationErrors = validate(userData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("User Data before API:", userData);

      const response = await Register(userData);

      if (response) {
        console.log("API Response:", response);
        alert("Registered successfully!");
        nameRef.current.value = "";
        genderRef.current.value = "";
        addressRef.current.value = "";
        emailRef.current.value = "";
        passwordRef.current.value = "";
      } else {
        alert("Registration failed!");
      }
    }
  };

  return (
    <>
      <div className="pageHeading py-5 d-flex w-25">
        <Link to="/" className="nav-link w-25">
          Home
        </Link>
        /<span className="active ms-3">{location.pathname.slice(1)}</span>
      </div>
      <div className="register-container">
        <div className="img-box">
          <img src={signup_img} alt="register" />
        </div>

        <div className="form-box">
          <div className="form-card">
            <h2>Create an account</h2>
            <p>Enter your details below</p>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Full Name" ref={nameRef} />
              {errors.name && <p className="error">{errors.name}</p>}

              <select ref={genderRef}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && <p className="error">{errors.gender}</p>}

              <input type="text" placeholder="Address" ref={addressRef} />
              {errors.address && <p className="error">{errors.address}</p>}

              <input
                type="email"
                placeholder="Email or Phone Number"
                ref={emailRef}
              />
              {errors.email && <p className="error">{errors.email}</p>}

              <input type="password" placeholder="Password" ref={passwordRef} />
              {errors.password && <p className="error">{errors.password}</p>}

              <button type="submit" className="createAccount">
                Create Account
              </button>
              <Link to="/reemail" className="login-link">
                resend
              </Link>
              
              <button type="button" className="google_register">
                Sign up with Google
              </button>

              <p className="login-text">
                Already have an account?
                <Link to="/login" className="login-link">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
