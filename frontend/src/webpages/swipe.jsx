// src/webpages/swipe.jsx
import { useNavigate } from 'react-router-dom';
function Swipe() {
      const navigate = useNavigate();
  return (
    <div>
        swipe
        <button onClick={() => navigate('/home')}>
            home
        </button>
    </div>
  );
}

export default Swipe;