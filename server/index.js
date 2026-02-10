// server/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow all connections for now (we fix this later)
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
  res.json({ 
    status: "success",
    message: "WYO Backend is Running!",
    timestamp: new Date()
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});