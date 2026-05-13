const Restaurant = require('../models/Restaurant');

const createRestaurant = async (req, res) => {
  try {
    const { name, description, cuisine, area, city } = req.body;

    if (!name || !cuisine || !area || !city) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    const restaurant = await Restaurant.create({
      name,
      description,
      cuisine,
      area,
      city,
      createdBy: req.user._id
    });

    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRestaurants = async (req, res) => {
  try {
    const { search, cuisine, city } = req.query;
    let query = {};

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    if (cuisine) {
      query.cuisine = { $regex: cuisine, $options: 'i' };
    }
    if (city) {
      query.city = { $regex: city, $options: 'i' };
    }

    const restaurants = await Restaurant.find(query)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id)
      .populate('createdBy', 'name email');

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    if (restaurant.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await restaurant.deleteOne();
    res.json({ message: 'Restaurant deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createRestaurant, getRestaurants, getRestaurantById, deleteRestaurant };