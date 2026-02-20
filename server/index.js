require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');

// Initialize App
const app = express();
const PORT = process.env.PORT || 5000;

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Passport Config
require('./config/passport')(passport);

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL ? process.env.FRONTEND_URL.replace(/\/$/, '') : '*', // Allow Vercel frontend (strip trailing slash if present)
  credentials: true // Allow cookies/sessions
}));
app.use(express.json());

// Session Middleware (Must be before passport.session())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: (MongoStore.create || MongoStore.default?.create || MongoStore.MongoStore?.create)({ mongoUrl: process.env.MONGO_URI }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    secure: false, // Set to true if using HTTPS only
    sameSite: 'lax' // needed for cross-site cookies
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
// Health Check Route
app.get('/', (req, res) => {
  res.json({ status: 'success', message: 'WYO API is running smoothly.' });
});

// 1. Login Route
app.get('/auth/discord', passport.authenticate('discord'));

// 2. Callback Route
app.get('/auth/discord/callback',
  passport.authenticate('discord', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect to frontend dashboard
    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  }
);

// 3. Get Current User Route
app.get('/auth/user', (req, res) => {
  if (req.user) {
    res.json({ authenticated: true, user: req.user });
  } else {
    res.json({ authenticated: false });
  }
});

// 4. Logout Route
app.get('/auth/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect(process.env.FRONTEND_URL);
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});