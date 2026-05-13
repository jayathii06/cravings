const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { toggleBookmark, getBookmarks } = require('../controllers/bookmarkController');

router.get('/', protect, getBookmarks);
router.post('/:restaurantId', protect, toggleBookmark);

module.exports = router;