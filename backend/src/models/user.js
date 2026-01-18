import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    auth0Id: { type: String, required: true, unique: true, index: true },

    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    age: { type: Number, default: null },
    email: { type: String, default: "" },

    interests: { type: [String], default: [] },
    profilePicUrl: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
