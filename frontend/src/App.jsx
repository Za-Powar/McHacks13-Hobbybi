import { useAuth0 } from "@auth0/auth0-react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginButton } from "./components/LoginButton";
import { LogoutButton } from "./components/LogoutButton";
import Signup from "./webpages/signup.jsx";
//import Home from "./webpages/Home.jsx"; // create this page later
import { useEffect } from "react";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;

  // For now, assume all logged-in users need to complete signup
  const hasProfile = false; // later check your DB

  useEffect(() => {
    if (isAuthenticated && !hasProfile) {
      navigate("/signup");
    } else if (isAuthenticated && hasProfile) {
      navigate("/home");
    }
  }, [isAuthenticated, hasProfile, navigate]);


  return (
    <div style={{ padding: "20px" }}>
      {isAuthenticated && <LogoutButton />}

      <Routes>
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

        <Route
          path="/signup"
          element={isAuthenticated ? <Signup /> : <Navigate to="/" />}
        />

        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/" />}
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
