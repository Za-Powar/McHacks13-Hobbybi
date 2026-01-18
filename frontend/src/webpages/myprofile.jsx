import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../styles/myprofile.css";

function Myprofile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("currentUser") || "null");
  const profile = JSON.parse(
    localStorage.getItem(`profile:${user?.id}`) || "null"
  );

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }
    if (!profile) {
      navigate("/createprofile", { replace: true });
    }
  }, [user, profile, navigate]);

  // ✅ Show something instead of blank while redirecting
  if (!user) return <div className="profilePage">Not logged in…</div>;
  if (!profile) return <div className="profilePage">Loading profile…</div>;

  return (
    <div className="profilePage">
      <header className="profileTop">
        <div>
          <h1 className="profileTitle">My Profile</h1>
          <p className="profileSubtitle">This is what you saved in your form.</p>
        </div>

        <button className="btnGhost" onClick={() => navigate("/home")}>
          ← Back to Home
        </button>
      </header>

      <main className="profileGrid">
        <section className="profileCard">
          <div className="avatar">👤</div>
          <h2 className="profileName">{profile.name || "No name"}</h2>
          <p className="profileMeta">{profile.university || "No university"}</p>

          <div className="pillRow">
            {(profile.interests || "")
              .split(",")
              .map((x) => x.trim())
              .filter(Boolean)
              .map((tag) => (
                <span className="pill" key={tag}>{tag}</span>
              ))}
          </div>

          <div className="profileActions">
            <button className="btnPrimary" onClick={() => navigate("/createprofile")}>
              Edit Profile
            </button>
            <button className="btnSecondary" onClick={() => navigate("/home")}>
              Home
            </button>
          </div>
        </section>

        <section className="profilePanel">
          <h3 className="panelTitle">Saved Data</h3>
          <div className="miniNote">
            Name: {profile.name || "-"} <br />
            University: {profile.university || "-"} <br />
            Interests: {profile.interests || "-"}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Myprofile;
