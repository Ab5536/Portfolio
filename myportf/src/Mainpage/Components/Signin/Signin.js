import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signin.css";
import InputField from "./Inputfield/InputField";

const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Sign-in logic and API call using fetch
  const SigninRouting = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Sending form data as JSON
      });

      // Check if the response is successful
      if (response.ok) {
        console.log("Signin successful");
        navigate("/"); // Redirect to home or dashboard after successful login
      } else {
        const data = await response.json(); // Get the response body (error message)
        if (response.status === 404) {
          setError("No user found with these credentials");
        } else if (response.status === 500) {
          setError("Server error, please try again later.");
        } else {
          setError(data.message || "An error occurred, please try again later.");
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred, please try again later.");
    }
  };

  // Form submission handler
  const submitHandler = (e) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      SigninRouting();
    } else {
      setError("Please fill in all fields.");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <h1 className="signin-title">Virtual Disease Detection</h1>
        <form className="signin-form" onSubmit={submitHandler}>
          <InputField
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputField
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-button">
            Sign In
          </button>
        </form>
        <p className="signup-link">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Signin;
