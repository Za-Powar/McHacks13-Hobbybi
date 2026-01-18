import User from "../models/User.js";

// GET /api/users/me
export const getMe = async (req, res) => {
  const auth0Id = req.user.auth0Id;

  // Find or create the user doc
  let user = await User.findOne({ auth0Id }).lean();

  if (!user) {
    user = await User.create({ auth0Id });
    user = user.toObject();
  }

  res.json({ success: true, user });
};

// GET /api/users/feed
export const getFeed = async (req, res) => {
  const me = req.user.auth0Id;

  // Return everyone except me
  const users = await User.find({ auth0Id: { $ne: me } })
    .limit(50)
    .lean();

  res.json({ success: true, users });
};

// /api/users/profile (save/update profile)
// Frontend should send: firstName, lastName, age, email, interests[], profilePicUrl
export const upsertProfile = async (req, res) => {
  const auth0Id = req.user.auth0Id;

  const {
    firstName,
    lastName,
    age,
    email,
    interests,
    profilePicUrl
  } = req.body;

  const updated = await User.findOneAndUpdate(
    { auth0Id },
    {
      firstName: firstName ?? "",
      lastName: lastName ?? "",
      age: age ?? null,
      email: email ?? "",
      interests: Array.isArray(interests) ? interests : [],
      profilePicUrl: profilePicUrl ?? ""
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  ).lean();

  res.json({ success: true, user: updated });
};
