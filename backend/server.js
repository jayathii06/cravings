const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const dishRoutes = require('./routes/dishRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const bookmarkRoutes = require('./routes/bookmarkRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/restaurants/:restaurantId/dishes', dishRoutes);
app.use('/api/restaurants/:restaurantId/dishes/:dishId/reviews', reviewRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
app.use('/api', userRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Cravings API is running 🍽️' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});