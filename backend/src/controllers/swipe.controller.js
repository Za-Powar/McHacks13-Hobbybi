export const swipeUser = (req, res) => {
  const { to, direction } = req.body;

  // temporary mock logic
  const match = Math.random() > 0.5;

  return res.json({ success: true, match });
};
