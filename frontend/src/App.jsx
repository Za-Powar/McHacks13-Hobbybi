import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { LogoutButton } from "./components/LogoutButton";
import Signup from "./webpages/signup.jsx";
import Welcome from "./webpages/welcome.jsx";
import Home from "./webpages/home.jsx"

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>;

  // For testing, all logged-in users go to signup first
  const hasProfile = false;

  return (
    <div style={{ padding: "20px" }}>
      {/* Show logout button if logged in */}
      {isAuthenticated && <LogoutButton />}

      <Routes>       

        {/* Welcome page */}
        <Route
          path="/"
          element={
            isAuthenticated
              ? hasProfile
                ? <Navigate to="/home" />
                : <Navigate to="/signup" />
              : <Welcome />
          }
        />

        {/* Home page */}
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/" />}
        />

        {/* Signup page */}
        <Route
          path="/signup"
          element={isAuthenticated ? <Signup /> : <Navigate to="/" />}
        />

        

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </div>
  );
}

export default App;
