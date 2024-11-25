const express = require('express');
const connectDB = require('./db');
const User = require('./userModel');

const app = express();
const port = 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// API Routes
app.get('/users', async (req, res) => {
  const { name, email } = req.body;
  const users = await User.find();
  res.json(users);
});

app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  const user = new User({ name, email });
  await user.save();
  res.json(user);
});

// Add a new user (POST /users)
app.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;

    const newUser = new User({ name, email });
    await newUser.save();

    res.json(newUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update a user (PUT /users/:id)
app.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, { name, email }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete a user (DELETE /users/:id)
app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});