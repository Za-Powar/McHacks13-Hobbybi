// src/webpages/home.jsx
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <div>
        <h1>Home</h1>
        <button onClick={() => navigate('/home/myprofile')}>
            My Profile
        </button>
        <button onClick={() => navigate('/home/swipe')}>
            Swipe
        </button>
        <button onClick={() => navigate('/home/messages')}>
            Messages
        </button>
        <button onClick={() => navigate('/home/createpost')}>
            Create Post
        </button>

        </div>
  );
}

export default Home;