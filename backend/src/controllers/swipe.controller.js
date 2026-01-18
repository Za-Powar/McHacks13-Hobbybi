import { swipes, chats, messages } from "../mockdata.js";

export const swipeUser = (req, res) => {
  const from = req.user.auth0Id;
  const { to, direction } = req.body;

  if (!to || !direction) {
    return res.status(400).json({ success: false, error: "Missing 'to' or 'direction'" });
  }

  swipes.push({ from, to, direction });

  const otherLikedYou = swipes.some(
    (s) => s.from === to && s.to === from && s.direction === "like"
  );

  const match = direction === "like" && otherLikedYou;

  let chatId = null;
  if (match) {
    chatId = `chat_${Date.now()}`;
    chats.push({ id: chatId, members: [from, to], lastMessage: "" });
    messages[chatId] = [];
  }

  res.json({ success: true, match, chatId });
};
