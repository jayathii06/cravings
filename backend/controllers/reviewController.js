const Review = require('../models/Review');
const Dish = require('../models/Dish');

const createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const dishId = req.params.dishId;

    if (!rating || !comment) {
      return res.status(400).json({ message: 'Rating and comment are required' });
    }

    const dish = await Dish.findById(dishId);
    if (!dish) {
      return res.status(404).json({ message: 'Dish not found' });
    }

    const existingReview = await Review.findOne({
      user: req.user._id,
      dish: dishId
    });

    if (existingReview) {
      return res.status(400).json({ message: 'You already reviewed this dish' });
    }

    const review = await Review.create({
      rating,
      comment,
      dish: dishId,
      user: req.user._id
    });

    await review.populate('user', 'name avatar');

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReviewsByDish = async (req, res) => {
  try {
    const reviews = await Review.find({ dish: req.params.dishId })
      .populate('user', 'name avatar')
      .sort({ createdAt: -1 });

    const avgRating = reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0;

    res.json({
      reviews,
      avgRating: Math.round(avgRating * 10) / 10,
      totalReviews: reviews.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await review.deleteOne();
    res.json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createReview, getReviewsByDish, deleteReview };