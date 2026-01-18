import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  function handleLogin() {
    // ✅ Replace with real login (Firebase/Auth0/etc.)
    // For now we simulate a logged in user:
    const fakeUser = { id: "user123", email: "user@example.com" };

    localStorage.setItem("currentUser", JSON.stringify(fakeUser));

    // Go to redirect decider
    navigate("/post-login", { replace: true });
  }

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <div style={{ padding: 24, borderRadius: 12, border: "1px solid #ccc" }}>
        <h2>Log In</h2>
        <button onClick={handleLogin}>Log In</button>
      </div>
    </div>
  );
}
