localStorage.setItem(`profile:${user.id}`, JSON.stringify(profileObject));
localStorage.setItem(`hasProfile:${user.id}`, "true");
navigate("/home", { replace: true });
