const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
  },
  members: {
    type: [mongoose.Schema.Types.ObjectId],
    default: []  // ← Add this for empty array default
  },
  nonMembers: {
    type: [mongoose.Schema.Types.ObjectId],
    default: []  // ← Add this for empty array default
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  description: {
    type: String,
    default: "Come join my activity!"
  }
});

module.exports = mongoose.model('Project', projectSchema);