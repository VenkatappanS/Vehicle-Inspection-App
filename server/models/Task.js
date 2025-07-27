// models/Task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  reportId: { type: String, required: true, unique: true },
  vehicleId: { type: String, required: true },
  assignedTo: { type: String }, // optional: user ID
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', TaskSchema);