const Listing = require('../models/Listings');

const createListing = async (req, res) => {
  try {
    const { title, description, location, price } = req.body;
    const host = req.user.id;

    const image = req.file?.path;

    if (!image) {
      return res.status(400).json({ message: 'Image upload failed' });
    }

    const newListing = await Listing.create({
      title,
      description,
      location,
      price,
      image,
      host,
    });

    res.status(201).json(newListing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getListings = async (req, res) => {
  try {
    const listings = await Listing.find().populate('host', 'name');
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate('host', 'name');
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    res.json(listing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const updateListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });

    if (listing.host.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const { title, description, location, price } = req.body;

    if (req.file?.path) {
      listing.image = req.file.path;
    }

    listing.title = title || listing.title;
    listing.description = description || listing.description;
    listing.location = location || listing.location;
    listing.price = price || listing.price;

    await listing.save();
    res.json(listing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    if (listing.host.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await listing.deleteOne(); 
    res.json({ message: 'Listing deleted' });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getHostListings = async (req, res) => {
  try {
    const listings = await Listing.find({ host: req.user.id });
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createListing,
  getListings,
  getListingById,
  deleteListing,
  getHostListings,
  updateListing, 
};
