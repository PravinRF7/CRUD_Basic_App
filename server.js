require('dotenv').config();
const express  = require('express');
const mongoose = require('mongoose');
const Task     = require('./models/Task');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ Mongo error:', err));

// CRUD routes

// Create
app.post('/tasks', async (req, res) => {
  try {
    const t = new Task(req.body);
    const saved = await t.save();
    res.status(201).json(saved);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Read all
app.get('/tasks', async (req, res) => {
  res.json(await Task.find());
});

// Read one
app.get('/tasks/:id', async (req, res) => {
  const t = await Task.findById(req.params.id);
  t ? res.json(t) : res.status(404).end();
});

// Update
app.put('/tasks/:id', async (req, res) => {
  const updated = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// Delete
app.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

// Start
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀 Server listening on http://localhost:${port}`));
