require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 1. Simple Home Route (No special characters, just a string)
app.get('/', (req, res) => {
  res.status(200).json({ 
    status: "success",
    message: "WYO Backend is ONLINE!",
    port: PORT
  });
});

// 2. Bind to 0.0.0.0 (Required for Render)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});