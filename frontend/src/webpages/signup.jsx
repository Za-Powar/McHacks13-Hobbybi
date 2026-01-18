import React, { useState } from "react";
import "../styles/signup-style.css";

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    interests: "",
    email: "",
    university: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Profile submitted! Check console.");
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

          <label>Profile Photo:</label>
          <input type="file" name="photo" onChange={handleChange} />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;