const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const User = require('./models/User');
const path = require('path');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Handling
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // In production, specify domain
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200); // Preflight request
  }

  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Signup Route
app.post('/signup', async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists, Please Login' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, phone, password: hashedPassword });

    res.status(201).json({ message: 'Successfully signed up' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

sequelize.sync()
  .then(() => {
    console.log('✅ MySQL DB synced');
    app.listen(PORT, () => console.log(`🚀 Server running on: http://localhost:${PORT}`));
  })
  .catch(err => console.error('DB sync error:', err));
