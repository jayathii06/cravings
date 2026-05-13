const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createRestaurant,
  getRestaurants,
  getRestaurantById,
  deleteRestaurant,
  getTrending
} = require('../controllers/restaurantController');

router.get('/trending', getTrending);
router.get('/', getRestaurants);
router.get('/:id', getRestaurantById);
router.post('/', protect, createRestaurant);
router.delete('/:id', protect, deleteRestaurant);

module.exports = router;