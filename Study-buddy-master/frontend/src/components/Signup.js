import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css/Signup.css";

const Signup = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { email, password };

    try {
      const response = await fetch("http://localhost:3001/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok) {
        setIsLoggedIn(true); // Mark user as logged in
        navigate("/home"); // Redirect to home page
      } else {
        alert(`Signup failed: ${data.message}`); // Display error message from the server
      }
    } catch (err) {
      console.error("Signup request error:", err);
      alert("Signup failed. Please try again later.");
    }
  };

  return (
    <div className="signup-form">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
