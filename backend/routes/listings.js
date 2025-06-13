const express = require('express');
const router = express.Router();
const {
  createListing,
  getListings,
  getListingById,
  deleteListing,
  getHostListings,
  updateListing
} = require('../controllers/listingController');
const authMiddleware = require('../middlewares/authMiddleware');
const { upload } = require('../utils/cloudinary');

router.get('/', getListings);
router.get('/host', authMiddleware, getHostListings); 
router.get('/:id', getListingById);
router.post('/', authMiddleware, upload.single('image'), createListing);
router.put('/:id', authMiddleware, upload.single('image'), updateListing);
router.delete('/:id', authMiddleware, deleteListing);

module.exports = router;
