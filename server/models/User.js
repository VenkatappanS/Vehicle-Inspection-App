const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  inspectorId: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
