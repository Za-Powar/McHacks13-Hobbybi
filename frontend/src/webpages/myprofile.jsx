// src/webpages/myprofile.jsx
import { useNavigate } from 'react-router-dom';
function Myprofile() {
    const navigate = useNavigate();
  return (
    <div>
        Myprofile
        <button onClick={() => navigate('/home')}>
            home
        </button>
    </div>
  );
}

export default Myprofile;