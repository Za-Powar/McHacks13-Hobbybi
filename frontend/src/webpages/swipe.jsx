import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Post from '../components/post.jsx';
import Undo from '../components/undo.jsx';
import Cross from '../components/cross.jsx';
import Checkmark from '../components/checkmark.jsx';

function Swipe() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitX, setExitX] = useState(0);

  useEffect(() => {
    const mockData = [
      {
        title: "Skiing buddies",
        description: "Going to Mt-Tremblant Feb 7th!",
        picture: "https://cdn.shipskis.com/blog/wp-content/uploads/2024/10/AdobeStock_573567031-1-jpeg.webp",
        tags: ["Sports", "Activities"]
      },
      {
        title: "Looking for a hackathon team",
        description: "Participating in McHacks 14!",
        picture: "https://app.mchacks.ca/static/media/mchacks-martlet-tight.c15b06650e3e5cda2d82cb370481b855.svg",
        tags: ["Engineering", "Coding"]
      }
    ];
    setPosts(mockData);
  }, []);

  const [direction, setDirection] = useState(0); // 1 for right, -1 for left

  const handleCross = () => {
    setDirection(-1); // Left
    setCurrentIndex((prev) => prev + 1);
  };

  const handleCheckmark = () => {
    setDirection(1); // Right
    setCurrentIndex((prev) => prev + 1);
  };

  // Define your animation variants
  const variants = {
    enter: { scale: 0.9, opacity: 0 },
    center: { scale: 1, opacity: 1, x: 0 },
    // 'custom' is the direction variable we pass in
    exit: (direction) => ({
      x: direction * 1000,
      opacity: 0,
      transition: { duration: 0.3 }
    })
  };

  const handleUndo = () => {
    if (currentIndex > 0) {
      setExitX(0); 
      setCurrentIndex((prev) => prev - 1);
    }
  };

  if (currentIndex >= posts.length) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <p>No more posts!</p>
        <button onClick={() => setCurrentIndex(0)}>Reset</button>
        <button onClick={handleUndo} style={{ marginTop: '10px' }}>Undo last swipe</button>
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh', 
      width: '100vw',
      backgroundColor: '#f5f5f5', // Added background for visibility
      overflow: 'hidden' 
    }}>
      
      {/* 1. TOP SECTION */}
      <div style={{ padding: '20px', zIndex: 10 }}>
        <button className="profile-home-btn" onClick={() => navigate("/home")}>
          Home
        </button>
      </div>

      {/* 2. MIDDLE SECTION (Responsive Spacer) */}
      <div style={{ flex: 1, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction} // Pass direction here
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, info) => {
              if (info.offset.x > 100) handleCheckmark();
              else if (info.offset.x < -100) handleCross();
            }}
            style={{ position: 'absolute', cursor: 'grab', touchAction: 'none' }}
          >
            <Post post={posts[currentIndex]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. BOTTOM SECTION */}
      <div className="button-controls" style={{ 
        display: 'flex', 
        gap: '30px', 
        justifyContent: 'center', 
        paddingBottom: '50px', // Increased padding to ensure visibility
        zIndex: 10 
      }}>
        <Cross onClick={handleCross} />
        <Undo onClick={handleUndo} />
        <Checkmark onClick={handleCheckmark}/>
      </div>
    </div>
  )
}

export default Swipe;