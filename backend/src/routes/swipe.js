import express from "express";
import { swipeUser } from "../controllers/swipe.controller.js";

const router = express.Router();

router.post("/", swipeUser);

export default router;
