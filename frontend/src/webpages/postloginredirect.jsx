import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// TEMP version using localStorage (replace with DB check later)
function hasProfile(userId) {
  return localStorage.getItem(`hasProfile:${userId}`) === "true";
}

export default function PostLoginRedirect({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    if (hasProfile(user.id)) {
      navigate("/home", { replace: true });
    } else {
      navigate("/createprofile", { replace: true });
    }
  }, [user, navigate]);

  return null; // no UI, just redirects
}
