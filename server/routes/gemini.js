// routes/gemini.js
const express = require('express');
const router = express.Router();
const { generateGeminiSummary } = require('../utils/geminiHelper');

router.post('/engine-summary', async (req, res) => {
  try {
    const summary = await generateGeminiSummary(req.body);
    res.json({ summary });
  } catch (err) {
    console.error('Gemini summary error:', err.message);
    res.status(500).json({ message: 'Failed to generate summary' });
  }
});

module.exports = router;
