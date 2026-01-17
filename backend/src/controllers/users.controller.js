export const getMe = (req, res) => {
  res.json({
    success: true,
    user: {
      auth0Id: req.user.auth0Id,
      name: "Test User",
      bio: "This is a mock user"
    }
  });
};
