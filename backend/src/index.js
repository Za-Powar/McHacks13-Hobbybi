import "dotenv/config";
import mongoose from "mongoose";
import app from "./app.js";

const PORT = process.env.PORT || 5000;

async function start() {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is missing. Create backend/.env and set MONGO_URI=...");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log("Mongo connected");

  app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
}

start().catch((e) => {
  console.error("Startup error:", e);
  process.exit(1);
});
