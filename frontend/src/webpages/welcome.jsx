// src/webpages/welcome.jsx
import { LoginButton } from "../components/LoginButton";

function Welcome() {
  return (
    <div>
        Welcome to Hobbybi, 
        this is where you can find people who have similar 
        interests as you to 
        <LoginButton/>
    </div>
  );
}

export default Welcome;