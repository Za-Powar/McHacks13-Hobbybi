// src/webpages/home.jsx
import { useNavigate } from 'react-router-dom';
import Myprofile from './myprofile.jsx';
import Swipe from './swipe.jsx';
import Messages from "./messages.jsx";

function Home() {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <div>
        <h1>Home</h1>
         <button onClick={() => navigate('/profile')}>
            My Profile
        </button>
        <button onClick={() => navigate('/swipe')}>
            Swipe
        </button>
        <button onClick={() => navigate('/messages')}>
            Messages
        </button>
        <Routes>
            {/* My Profile page */}
            <Route
            path="/home/myprofile"
            element={isAuthenticated ? <Myprofile /> : <Navigate to="/" />}
            />

            {/* Swipe page */}
            <Route
            path="/home/swipe"
            element={isAuthenticated ? <Swipe /> : <Navigate to="/" />}
            />

            {/* Messages page */}
            <Route
            path="/home/messages"
            element={isAuthenticated ? <Messages /> : <Navigate to="/" />}
            />

            {/* Chat page */}
            <Route
            path="/home/messages/chat"
            element={isAuthenticated ? <Chat /> : <Navigate to="/" />}
            />
        </Routes>
        </div>
  );
}

export default Home;