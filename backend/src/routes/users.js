import express from "express";
import { getMe, getFeed, upsertProfile } from "../controllers/users.controller.js";

const router = express.Router();

router.get("/me", getMe);
router.get("/feed", getFeed);
router.post("/profile", upsertProfile);

export default router;
