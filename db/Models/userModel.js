const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  username: { 
    type: String, 
    required: true,
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  profile: {
    firstName: String,
    lastName: String,
    age: Number
  },
  avatar: {
    type: String,  // URL from hosting service
    default: 'https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon'
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  topics: {
    type: [mongoose.Schema.Types.ObjectId],
    default: []  // ← Add this for empty array default
  },
  projects: {
    type: [mongoose.Schema.Types.ObjectId],
    default: []  // ← Add this for empty array default
  },
  university: {
    type: String,
    default: 'McGill University'
  }
});

module.exports = mongoose.model('User', userSchema);