const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

const allowedOrigins = [
  'https://stayfinder-three.vercel.app',
  'https://stayfinder-git-main-manas-projects-5c539d17.vercel.app',
  'http://localhost:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const listingRoutes = require('./routes/listings');
app.use('/api/listings', listingRoutes);

const bookingRoutes = require('./routes/bookings');
app.use('/api/bookings', bookingRoutes);


const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Atlas connected ✅'))
.catch((err) => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
