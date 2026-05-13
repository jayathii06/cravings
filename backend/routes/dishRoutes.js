const express = require('express');
const router = express.Router({ mergeParams: true });
const { protect } = require('../middleware/authMiddleware');
const {
  createDish,
  getDishesByRestaurant,
  getDishById,
  deleteDish
} = require('../controllers/dishController');

router.get('/', getDishesByRestaurant);
router.post('/', protect, createDish);
router.get('/:id', getDishById);
router.delete('/:id', protect, deleteDish);

module.exports = router;