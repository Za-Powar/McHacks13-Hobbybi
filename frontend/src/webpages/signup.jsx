import React, { useState } from "react";
import "../styles/signup-style.css";
import { useNavigate } from 'react-router-dom';

function Signup({ setHasProfile }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    interests: "",
    email: "",
    university: "",
    profilePicUrl: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const interestsArray = formData.interests
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);

  const payload = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    age: Number(formData.age),
    email: formData.email,
    university: formData.university,
    interests: interestsArray,
    profilePicUrl: formData.profilePicUrl
  };

  try {
  const res = await fetch("/api/users/profile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });


    const data = await res.json();

    if (!data.success) {
      alert("Profile save failed: " + (data.error || "unknown error"));
      return;
    }

    setHasProfile(true);
    navigate("/home");
  } catch (err) {
    alert("Backend not reachable. Is backend running on http://localhost:5000 ?");
  }
};


  return (
    <div className="signup-page">  {/* Outer container applied */}
      <div className="login-form-wrapper">
        <h2>Create Your Profile</h2>
        <form onSubmit={handleSubmit}>
          <label>First Name:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />

          <label>Last Name:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />

          <label>Age:</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} required />

          <label>Interests:</label>
          <input type="text" name="interests" value={formData.interests} onChange={handleChange} placeholder="e.g., coding, art" />

          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>University:</label>
          <input type="text" name="university" value={formData.university} onChange={handleChange} required />

          <label>Profile Photo URL:</label>
          <input
            type="text"
            name="profilePicUrl"
            value={formData.profilePicUrl}
            onChange={handleChange}
            placeholder="https://..."
          />


          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;