import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profile-style.css"; // your CSS file

function Myprofile() {
  const navigate = useNavigate();

  // Example user data
  const userProfile = {
    name: "Sharley R.",
    photo: "https://via.placeholder.com/150",
    contact: "sharley@example.com",
    age: 17,
    university: "University of Toronto",
    interests: "Robotics, Coding, Music",
  };

  const [photo, setPhoto] = useState(userProfile.photo);

  // Drag & drop handler
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setPhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setPhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        {/* Profile Name */}
        <h2 className="profile-name">{userProfile.name}</h2>

        {/* Profile Picture Drag & Drop */}
        <div
          className="profile-picture-wrapper"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <img
            src={photo || "https://via.placeholder.com/150"}
            alt="Profile"
            className="profile-picture"
          />
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="profile-upload-input"
        />

        {/* Profile Info */}
        <div className="profile-info">
          <p><strong>Contact Point:</strong> {userProfile.contact}</p>
          <p><strong>Age:</strong> {userProfile.age}</p>
          <p><strong>University:</strong> {userProfile.university}</p>
          <p><strong>Interests:</strong> {userProfile.interests}</p>
        </div>

        {/* Home Button */}
        <button className="profile-home-btn" onClick={() => navigate("/home")}>
          Home
        </button>
      </div>
    </div>
  );
}

export default Myprofile;
