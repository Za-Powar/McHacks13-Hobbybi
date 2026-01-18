const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  content: { 
    type: String, 
    required: true, 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true
  }
});

module.exports = mongoose.model('Message', messageSchema);