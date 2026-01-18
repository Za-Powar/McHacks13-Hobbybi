// src/webpages/createpost.jsx
import { useNavigate } from 'react-router-dom';

function Createpost() {
  
    const navigate = useNavigate();
  return (
    <div>
        Create Post
        <button onClick={() => navigate('/home')}>
            home
        </button>
    </div>
  );
}

export default Createpost;