// src/webpages/swipe.jsx
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Post from '../components/post.jsx';

function Swipe() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
    const mockData = [
      {
        title: "Building a Robot",
        description: "Looking for a teammate to help with Arduino sensors.",
        picture: "https://images.unsplash.com/photo-1581092160562-40aa08e78837",
        tags: ["Engineering", "Hardware"]
<<<<<<< HEAD
=======
      },
      {
        title: "Looking for a hackathon team",
        description: "Participating in McHacks 14!",
        picture: "https://app.mchacks.ca/static/media/mchacks-martlet-tight.c15b06650e3e5cda2d82cb370481b855.svg",
        tags: ["Engineering", "Software"]
>>>>>>> origin/Harini
      }
    ];
    setPosts(mockData);
  }, []);

  return (
  <div className="feed-container">
    {posts.map((post, index) => (
      <Post 
        key={index}
        post={post} // Pass the whole object here!
      />
    ))}
  </div>
);
}

export default Swipe;