import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/createpost.css";

const FIXED_TAGS = ["Engineering", "Coding", "Activities", "Cycling", "Gaming", "Sports"];

function Createpost({ posts, setPosts }) {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [success, setSuccess] = useState(false);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setPhoto(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      id: Date.now(),
      title,
      description,
      tags: selectedTags,
      photo,
    };


    // Reset form
    setTitle("");
    setDescription("");
    setSelectedTags([]);
    setPhoto(null);
    document.getElementById("photo-input").value = "";

    // Show success message
    setSuccess(true);

    // Redirect after 1 second
    setTimeout(() => {
      setSuccess(false);
      navigate("/home");
    }, 1000);
  };

  return (
    <div className="createpost-page">
      <div className="createpost-card">
        <h2>Create a Post</h2>

        <form className="createpost-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Hobby title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Describe the hobby"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          {/* Fixed tags */}
          <div className="tags-selector">
            {FIXED_TAGS.map((tag) => (
              <span
                key={tag}
                className={`tag selectable ${
                  selectedTags.includes(tag) ? "selected" : ""
                }`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </span>
            ))}
          </div>

          <input
            type="file"
            id="photo-input"
            accept="image/*"
            onChange={handlePhotoChange}
          />

          {/* Only type="submit", remove onClick */}
          <button type="submit">Add Post</button>
        </form>

        {success && (
          <p style={{ color: "green", marginTop: "10px", textAlign: "center" }}>
            Post added! Redirecting to Home...
          </p>
        )}

        <button className="back-btn" onClick={() => navigate("/home")}>
          Back to Home
        </button>
      </div>

      <div className="posts-list">
        <h3>Your Posts</h3>
        {(posts || []).length === 0 && <p>No posts yet</p>}

        {(posts || []).map((post) => (
          <div key={post.id} className="post-card">
            <h4>{post.title}</h4>
            <p>{post.description}</p>

            {post.photo && (
              <img
                src={post.photo}
                alt="Post"
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  marginTop: "8px",
                }}
              />
            )}

            <div className="tags">
              {(post.tags || []).map((tag, index) => (
                <span key={index} className="tag">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Createpost;
