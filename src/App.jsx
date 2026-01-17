import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "./components/LoginButton";
import { LogoutButton } from "./components/LogoutButton";

function App() {
  return <h1>Hello Hobbybies</h1>;
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>My Auth0 App</h1>
      {!isAuthenticated ? (
        <LoginButton />
      ) : (
        <div>
          <LogoutButton />
          <h2>Welcome, {user.name}</h2>
          <img src={user.picture} alt={user.name} style={{ borderRadius: '50%' }} />
        </div>
      )}
    </div>
  );
}

export default App;