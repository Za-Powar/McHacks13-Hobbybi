const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  description: {
    type: String,
    default: "Come join my activity!"
  },
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    required: true  // ← Add this for empty array default
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

module.exports = mongoose.model('Project', projectSchema);