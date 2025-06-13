const Booking = require('../models/Bookings');

const createBooking = async (req, res) => {
  try {
    const { listingId, checkIn, checkOut } = req.body;

    const booking = await Booking.create({
      user: req.user.id,
      listing: listingId,
      checkIn,
      checkOut,
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('listing', 'title location price image');

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getHostBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate({
        path: 'listing',
        match: { host: req.user.id },
        select: 'title location',
      })
      .populate('user', 'name');

    const filtered = bookings.filter(b => b.listing !== null);

    res.json(filtered);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to delete this booking' });
    }

    await booking.deleteOne();

    res.json({ message: 'Booking deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
  createBooking,
  getUserBookings,
  getHostBookings,
  deleteBooking,
};
