// src/webpages/messages.jsx
import { useNavigate } from 'react-router-dom';

function Messages() {
  
    const navigate = useNavigate();
  return (
    <div>
        Messages
        <button onClick={() => navigate('/home')}>
            home
        </button>
    </div>
  );
}

export default Messages;