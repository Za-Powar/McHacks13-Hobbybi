import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "./components/LoginButton";
import { LogoutButton } from "./components/LogoutButton";
import Signup from "./webpages/signup.jsx";

// Dummy Home page for testing
const Home = () => <h2 style={{ textAlign: "center", marginTop: "50px" }}>Welcome Home!</h2>;

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>;


  const hasProfile = false;

  return (
    <div style={{ padding: "20px" }}>
      {/* Show logout button if logged in */}
      {isAuthenticated && <LogoutButton />}

      <Routes>
        {/* Landing page */}
        <Route
          path="/"
          element={
            isAuthenticated
              ? hasProfile
                ? <Navigate to="/home" />
                : <Navigate to="/signup" />
              : <LoginButton />
          }
        />

        {/* Signup page */}
        <Route
          path="/signup"
          element={isAuthenticated ? <Signup /> : <Navigate to="/" />}
        />

        {/* Home page */}
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/" />}
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
