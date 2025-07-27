const express = require('express');
const router = express.Router();
const Task = require('../models/VehicleTask');

router.get('/', async (req, res) => {
  try {
    const inspectorId = req.cookies.authToken;

    console.log("Incoming inspectorId from cookie:", inspectorId);
    if (!inspectorId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const tasks = await Task.find({ assignedTo: inspectorId.toString() }); // <== fix
    console.log("Fetched tasks:", tasks); // debug log

    res.json(tasks);
  } catch (err) {
    console.error("Error in GET /tasks:", err);
    res.status(500).json({ message: 'Failed to load tasks' });
  }
});


// GET task by reportId
router.get('/:reportId', async (req, res) => {
  try {
    const task = await Task.findOne({ reportId: req.params.reportId });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT (update) task by reportId
router.put('/:reportId', async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { reportId: req.params.reportId },
      req.body,
      { new: true }
    );
    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST create a new task
router.post('/', async (req, res) => {
  try {
    const inspectorId = req.cookies.authToken;
    if (!inspectorId) return res.status(401).json({ message: 'Unauthorized' });

    const newTask = new Task({
      ...req.body,
      assignedTo: inspectorId
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error saving task' });
  }
});


module.exports = router;
