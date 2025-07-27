const express = require('express');
const router = express.Router();
const Inspection = require('../models/SubmitReportSchema');
const VehicleTask = require('../models/VehicleTask');

router.post('/submit-inspection', async (req, res) => {
  const { reportId, ...formData } = req.body;

  try {
    // Save inspection details
    const inspection = new Inspection({ reportId, ...formData });
    await inspection.save();

    // Update vehicle task status
    await VehicleTask.findOneAndUpdate(
      { reportId },
      {
        $set: {
          status: 'Completed',
          data: formData
        }
      }
    );

    res.status(201).json({ message: 'Inspection submitted and task updated' });
  } catch (err) {
    console.error('Error submitting inspection:', err);
    res.status(500).json({ message: 'Submission failed' });
  }
});

module.exports = router;
