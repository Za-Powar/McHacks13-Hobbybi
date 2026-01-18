import { LoginButton } from "../components/LoginButton";
import "../styles/welcome.css";

function Welcome() {
  return (
    <div className="welcome-page">
      <div className="welcome-card">
        <h1 className="welcome-title">Welcome to Hobbybi</h1>

        <p className="welcome-subtitle">
          Find people at your uni who share your interests, then team up and build
          something together.
        </p>

        <p className="welcome-value">
          Built for students who want to <strong>build</strong>, not scroll.
        </p>

        <div className="welcome-cta">
          <LoginButton />
        </div>

        <p className="welcome-note">
          Create a profile • Match with teammates • Chat • Build
        </p>

        <div className="welcome-steps">
          <div className="welcome-step">
            <span className="welcome-step-num">1</span>
            <p className="welcome-step-text">Create your profile</p>
          </div>

          <div className="welcome-step">
            <span className="welcome-step-num">2</span>
            <p className="welcome-step-text">Swipe on projects & people</p>
          </div>

          <div className="welcome-step">
            <span className="welcome-step-num">3</span>
            <p className="welcome-step-text">Chat & start building</p>
          </div>
        </div>

        <div className="welcome-features">
          <div className="welcome-feature">
            <div className="welcome-icon">✓</div>
            <h3>Swipe-like matching</h3>
            <p>Quick yes/no on projects and teammates.</p>
          </div>

          <div className="welcome-feature">
            <div className="welcome-icon">💬</div>
            <h3>Group chat</h3>
            <p>Start a group with the people you want to work with.</p>
          </div>

          <div className="welcome-feature">
            <div className="welcome-icon">⚡</div>
            <h3>Move fast</h3>
            <p>Go from idea → team → build in days, not weeks.</p>
          </div>
        </div>

        <div className="welcome-footer">
          Only students • No ads • No recruiters • No spam
        </div>
      </div>
    </div>
  );
}

export default Welcome;