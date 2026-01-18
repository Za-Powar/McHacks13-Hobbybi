import express from "express";
import {
  getChats,
  sendMessage
} from "../controllers/chats.controller.js";

const router = express.Router();

// Get my chats
router.get("/", getChats);

// Send message in chat
router.post("/:chatId/message", sendMessage);

export default router;
