// src/routes/chats.js
import express from "express";
import { getChats, sendMessage } from "../controllers/chats.controller.js";

const router = express.Router();

router.get("/", getChats);
router.post("/:chatId/message", sendMessage);

export default router;
