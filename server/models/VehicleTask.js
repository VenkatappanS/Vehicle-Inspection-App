const mongoose = require('mongoose');

const vehicleTaskSchema = new mongoose.Schema({
  reportId: { type: String, required: true, unique: true },
  vehicleId: { type: String, required: true },
  assignedTo: { type: String, required: true },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending'
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
}, { timestamps: true });

module.exports = mongoose.model('VehicleTask', vehicleTaskSchema);