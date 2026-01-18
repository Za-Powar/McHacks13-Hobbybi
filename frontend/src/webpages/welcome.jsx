// src/webpages/welcome.jsx
import { LoginButton } from "../components/LoginButton";

function Welcome() {
  return (
    <div>
        Welcome to Hobbybi, 
        this is where you can find people who have similar 
        interests as you to find activities to do together. 
        Start by logging in and creating your profile. Then,
        create your first post about an activity you'd like 
        to find friends to do with or head over to the swipe 
        page to start looking at other people's post and find
        activities that catch your eye.
        <LoginButton/>
    </div>
  );
}

export default Welcome;