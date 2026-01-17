const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true 
  },
  members: {
    type: [mongoose.Schema.Types.ObjectId],
    default: []  // ← Add this for empty array default
  },
  nonMembers: {
    type: [mongoose.Schema.Types.ObjectId],
    default: []  // ← Add this for empty array default
  },
  description: {
    type: String,
    default: ""
  },
  projects: {
    type: [mongoose.Schema.Types.ObjectId],
    default: []
  }
});

module.exports = mongoose.model('Topic', topicSchema);