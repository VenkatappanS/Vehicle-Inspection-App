const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

app.get('/', (req, res) => {
  res.json({ message: 'Server is working!' });
});

const User = require('./models/User');

app.post('/api/login', async (req, res) => {
  const { inspectorId, password } = req.body;

  try {
    const user = await User.findOne({ inspectorId });

    if (!user) {
      return res.status(401).json({ message: 'Invalid inspector ID or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid inspector ID or password' });
    }

    // Set cookie for session
    res.cookie('authToken', user._id, {
      httpOnly: true,
      sameSite: 'Lax',
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
});



// const User = require('./models/User');

app.post('/api/signup', async (req, res) => {
  const { inspectorId, password } = req.body;

  try {
    const existing = await User.findOne({ inspectorId });
    if (existing) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ inspectorId, password });
    await newUser.save();
    res.json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating user' });
  }
});


app.post('/api/register', async (req, res) => {
  const { inspectorId, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      inspectorId,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user' });
  }
});

const VehicleTask = require('./models/VehicleTask');

// Get a specific task by reportId
app.get('/api/tasks/:reportId', async (req, res) => {
  try {
    const task = await VehicleTask.findOne({ reportId: req.params.reportId });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching task' });
  }
});

const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);

const inspectionRoutes = require('./routes/inspection');
app.use('/api', inspectionRoutes);

const geminiRoutes = require('./routes/gemini');
app.use('/api/gemini', geminiRoutes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
