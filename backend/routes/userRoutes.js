const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getMyReviews } = require('../controllers/reviewController');

router.get('/reviews/my', protect, getMyReviews);

module.exports = router;