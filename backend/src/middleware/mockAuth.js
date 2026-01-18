export const mockAuth = (req, res, next) => {
  req.user = {
    auth0Id: "auth0|test123"
  };
  next();
};
