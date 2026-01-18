const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  auth0Id: {
    type: String,
    unique: true,
    required: true
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  profile: {
    type: {
        firstName: String,
        lastName: String,
        age: Number
    },
    required: true
  },
  socialMedia: {
    instagram: {
        type: String,
        default: ""
    },
    facebook: {
        type: String,
        default: ""
    },
    discord: {
        type: String,
        default: ""
    }
  },
  avatar: {
    type: String,  // URL from hosting service
    default: 'https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon'
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  topics: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topic",
    default: []  // default empty array if you don’t provide members
  }],
  projects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    default: []  // default empty array if you don’t provide members
  }],
  university: {
    type: String,
    default: 'McGill University'
  }
});

module.exports = mongoose.model('User', userSchema);