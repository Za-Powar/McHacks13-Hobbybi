import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { LogoutButton } from "./components/LogoutButton";
import Signup from "./webpages/signup.jsx";
import Welcome from "./webpages/welcome.jsx";
import Home from "./webpages/home.jsx"
import Myprofile from "./webpages/myprofile.jsx";
import Swipe from "./webpages/swipe.jsx";
import Createpost from "./webpages/createpost.jsx";

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [hasProfile, setHasProfile] = useState(false);

  if (isLoading) return <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>;




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
          element={isAuthenticated ? <Signup setHasProfile={setHasProfile} /> : <Navigate to="/" />}
        />

        {/* My Profile page */}
        <Route
        path="/home/myprofile"
        element={isAuthenticated ? <Myprofile /> : <Navigate to="/" />}
        />

        {/* Swipe page */}
        <Route
        path="/home/swipe"
        element={isAuthenticated ? <Swipe /> : <Navigate to="/" />}
        />

        {/* Create post page */}
        <Route
        path="/home/createpost"
        element={isAuthenticated ? <Createpost /> : <Navigate to="/" />}
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </div>
  );
}

export default App;
