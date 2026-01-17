export const getChats = (req, res) => {
  res.json({ success: true, chats: [] });
};

export const sendMessage = (req, res) => {
  const { chatId } = req.params;
  const { text } = req.body;
  res.json({ success: true, message: { chatId, text, sender: req.user.auth0Id } });
};
