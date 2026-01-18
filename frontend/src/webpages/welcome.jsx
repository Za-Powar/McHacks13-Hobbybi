import { LoginButton } from "../components/LoginButton";
import "../styles/welcome.css";

function Welcome() {
  return (
    <div className="welcome-page">
      <div className="welcome-card">
        <h1 className="welcome-title">Welcome to Hobbybi!</h1>
        <p className="welcome-text">
          Hobbybi is your one stop destination to connect with people who share your interests and find activities to do together.
        </p>
        <p className="welcome-text">
          Start by logging in and creating your profile. 
        </p>
        <p className="welcome-text">
          Then, create your first post about an activity you'd like to do with friends or head over to the swipe page to explore other people's posts and find activities that catch your eye.
        </p>
        <div className="login-button-wrapper">
          <LoginButton />
        </div>
      </div>
    </div>
  );
}

export default Welcome;
