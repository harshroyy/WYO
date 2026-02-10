require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
// Render sets the PORT env variable to 10000 automatically
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 1. Log every request to the console (View this in Render Logs)
app.use((req, res, next) => {
  console.log(`[REQUEST] ${req.method} ${req.path}`);
  next();
});

// 2. The Home Route
app.get('/', (req, res) => {
  res.status(200).json({ 
    status: "success",
    message: "WYO Backend is ONLINE!",
    port: PORT
  });
});

// 3. Catch-All Route (Fixes 'Cannot GET /' errors)
app.get('*', (req, res) => {
  res.json({ message: "Route not found, but Server is working!" });
});

// 4. Bind to 0.0.0.0 (Required for Render)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});