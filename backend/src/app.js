// src/app.js
import express from "express";
import cors from "cors";
import { mockAuth } from "./middleware/mockAuth.js";

// 1) create app FIRST
const app = express();

// 2) middleware AFTER app exists
app.use(cors());
app.use(express.json());
app.use(mockAuth);

// 3) routes
import usersRoutes from "./routes/users.js";
import swipeRoutes from "./routes/swipe.js";
import chatsRoutes from "./routes/chats.js";

app.use("/api/users", usersRoutes);
app.use("/api/swipe", swipeRoutes);
app.use("/api/chats", chatsRoutes);

// 4) health
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

export default app;
