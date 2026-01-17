// src/app.js
import express from "express";
import { mockAuth } from "./middleware/mockAuth.js";

// 1️⃣ Initialize app first
const app = express();

// 2️⃣ Apply global middleware
app.use(express.json());
app.use(mockAuth);

// 3️⃣ Import routes **after app is declared**
import usersRoutes from "./routes/users.js";
import swipeRoutes from "./routes/swipe.js";
import chatsRoutes from "./routes/chats.js";

// 4️⃣ Use routes
app.use("/api/users", usersRoutes);
app.use("/api/swipe", swipeRoutes);
app.use("/api/chats", chatsRoutes);

// 5️⃣ Export app for index.js
export default app;
