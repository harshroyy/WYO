const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  discordId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  avatar: { type: String },
  // We will add game/rank profiles later
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);