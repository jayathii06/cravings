const express = require('express');
const router = express.Router({ mergeParams: true });
const { protect } = require('../middleware/authMiddleware');
const {
  createReview,
  getReviewsByDish,
  deleteReview
} = require('../controllers/reviewController');

router.get('/', getReviewsByDish);
router.post('/', protect, createReview);
router.delete('/:id', protect, deleteReview);

module.exports = router;