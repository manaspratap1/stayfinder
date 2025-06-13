const express = require('express');
const router = express.Router();
const {
  createBooking,
  getUserBookings,
  getHostBookings,
  deleteBooking,
} = require('../controllers/bookingcontroller');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, createBooking);
router.get('/my', authMiddleware, getUserBookings);
router.get('/host', authMiddleware, getHostBookings);
router.delete('/:id', authMiddleware, deleteBooking);  

module.exports = router;
