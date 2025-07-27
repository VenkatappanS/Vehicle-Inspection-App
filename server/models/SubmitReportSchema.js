// models/SubmitReport.js
const mongoose = require('mongoose');

const SubmitReportSchema = new mongoose.Schema({
  reportId: { type: String, required: true, unique: true },

  // Header section
  truckSerial: String,
  truckModel: String,
  inspectorName: String,
  inspectionEmpId: String,
  inspectionDateTime: String,
  location: String,
  geoCoordinates: String,
  serviceMeterHours: String,
  inspectorSignature: String,
  customerName: String,
  customerId: String,

  // Tires section
  leftFrontPressure: String,
  rightFrontPressure: String,
  leftFrontCondition: String,
  rightFrontCondition: String,
  leftRearPressure: String,
  rightRearPressure: String,
  leftRearCondition: String,
  rightRearCondition: String,
  tireSummary: String,

  // Battery section
  batteryVoltage: String,
  batteryCondition: String,
  batteryTerminals: String,
  batterySummary: String,

  // Exterior section
  bodyCondition: String,
  lights: String,
  mirrors: String,
  exteriorSummary: String,

  // Brakes section
  brakePads: String,
  brakeFluid: String,
  brakeResponse: String,
  brakeSummary: String,

  // Engine section
  oilLevel: String,
  coolantLevel: String,
  beltsCondition: String,
  engineNoise: String,
  engineSummary: String,

  // Feedback (optional)
  additionalFeedback: String,

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SubmitReport', SubmitReportSchema);
