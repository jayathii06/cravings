import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from '../utils/axios';
import { useAuth } from '../context/AuthContext';

const RestaurantPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [restaurant, setRestaurant] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    fetchRestaurant();
    fetchDishes();
  }, [id]);

  const fetchRestaurant = async () => {
    try {
      const { data } = await axios.get(`/restaurants/${id}`);
      setRestaurant(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDishes = async () => {
    try {
      const { data } = await axios.get(`/restaurants/${id}/dishes`);
      setDishes(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBookmark = async () => {
    if (!user) return alert('Please login to bookmark');
    try {
      const { data } = await axios.post(`/bookmarks/${id}`);
      setBookmarked(data.isBookmarked);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return (
    <div>
      <Navbar />
      <div style={styles.loading}>
        <div style={styles.spinner}></div>
        <p>Loading restaurant...</p>
      </div>
    </div>
  );

  if (!restaurant) return (
    <div>
      <Navbar />
      <div style={styles.loading}><p>Restaurant not found</p></div>
    </div>
  );

  return (
    <div style={styles.page}>
      <Navbar />

      <div style={styles.hero}>
        {restaurant.image ? (
          <img src={restaurant.image} alt={restaurant.name} style={styles.heroImage} />
        ) : (
          <div style={styles.heroPlaceholder}>🍽️</div>
        )}
        <div style={styles.heroOverlay}>
          <div style={styles.heroContent}>
            <span style={styles.cuisineBadge}>{restaurant.cuisine}</span>
            <h1 style={styles.heroTitle}>{restaurant.name}</h1>
            <p style={styles.heroLocation}>📍 {restaurant.area}, {restaurant.city}</p>
            <p style={styles.heroDesc}>{restaurant.description}</p>
            <button
              onClick={handleBookmark}
              style={bookmarked ? { ...styles.bookmarkBtn, ...styles.bookmarkActive } : styles.bookmarkBtn}
            >
              {bookmarked ? '🔖 Saved' : '+ Save Restaurant'}
            </button>
          </div>
        </div>
      </div>

      <div style={styles.container}>
        <h2 style={styles.sectionTitle}>Dishes at {restaurant.name}</h2>

        {dishes.length === 0 ? (
          <div style={styles.empty}>
            <p style={{ fontSize: '2.5rem' }}>🍴</p>
            <p>No dishes added yet</p>
          </div>
        ) : (
          <div style={styles.dishGrid}>
            {dishes.map(dish => (
              <Link
                key={dish._id}
                to={`/restaurants/${id}/dishes/${dish._id}`}
                style={styles.dishLink}
              >
                <div style={styles.dishCard}>
                  <div style={styles.dishImageContainer}>
                    {dish.image ? (
                      <img src={dish.image} alt={dish.name} style={styles.dishImage} />
                    ) : (
                      <div style={styles.dishPlaceholder}>🍴</div>
                    )}
                  </div>
                  <div style={styles.dishContent}>
                    <h3 style={styles.dishName}>{dish.name}</h3>
                    {dish.flavor && <p style={styles.dishFlavor}>✨ {dish.flavor}</p>}
                    {dish.ingredients && (
                      <p style={styles.dishIngredients}>🌿 {dish.ingredients}</p>
                    )}
                    <div style={styles.dishFooter}>
                      {dish.weight && <span style={styles.dishWeight}>⚖️ {dish.weight}</span>}
                      {dish.price > 0 && (
                        <span style={styles.dishPrice}>₹{dish.price}</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: { minHeight: '100vh', background: 'var(--bg)' },
  loading: {
    textAlign: 'center',
    padding: '4rem',
    color: 'var(--text-secondary)'
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '3px solid var(--border)',
    borderTop: '3px solid var(--primary)',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
    margin: '0 auto 1rem'
  },
  hero: {
    position: 'relative',
    height: '320px',
    overflow: 'hidden'
  },
  heroImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  heroPlaceholder: {
    width: '100%',
    height: '100%',
    background: 'var(--surface)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '5rem'
  },
  heroOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, rgba(44,24,16,0.85) 0%, transparent 50%)',
    display: 'flex',
    alignItems: 'flex-end'
  },
  heroContent: {
    padding: '2rem',
    color: 'var(--white)'
  },
  cuisineBadge: {
    background: 'var(--primary)',
    color: 'var(--white)',
    padding: '0.25rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '600'
  },
  heroTitle: {
    fontSize: '2rem',
    fontWeight: '800',
    marginTop: '0.5rem',
    marginBottom: '0.25rem'
  },
  heroLocation: {
    fontSize: '0.9rem',
    opacity: 0.85,
    marginBottom: '0.5rem'
  },
  heroDesc: {
    fontSize: '0.875rem',
    opacity: 0.8,
    marginBottom: '1rem',
    maxWidth: '500px'
  },
  bookmarkBtn: {
    background: 'rgba(255,255,255,0.15)',
    color: 'var(--white)',
    border: '1.5px solid rgba(255,255,255,0.4)',
    padding: '0.5rem 1.2rem',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '0.875rem',
    cursor: 'pointer',
    backdropFilter: 'blur(4px)'
  },
  bookmarkActive: {
    background: 'var(--primary)',
    border: '1.5px solid var(--primary)'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem'
  },
  sectionTitle: {
    fontSize: '1.4rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
    marginBottom: '1.5rem'
  },
  empty: {
    textAlign: 'center',
    padding: '3rem',
    color: 'var(--text-secondary)'
  },
  dishGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '1.25rem'
  },
  dishLink: { textDecoration: 'none', color: 'inherit' },
  dishCard: {
    background: 'var(--white)',
    borderRadius: '14px',
    overflow: 'hidden',
    border: '1px solid var(--border)',
    transition: 'transform 0.2s',
    cursor: 'pointer'
  },
  dishImageContainer: { height: '150px', overflow: 'hidden' },
  dishImage: { width: '100%', height: '100%', objectFit: 'cover' },
  dishPlaceholder: {
    width: '100%',
    height: '100%',
    background: 'var(--surface)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2.5rem'
  },
  dishContent: { padding: '1rem' },
  dishName: {
    fontSize: '1rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
    marginBottom: '0.4rem'
  },
  dishFlavor: {
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
    marginBottom: '0.25rem'
  },
  dishIngredients: {
    fontSize: '0.78rem',
    color: 'var(--text-secondary)',
    marginBottom: '0.5rem',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  },
  dishFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '0.5rem'
  },
  dishWeight: { fontSize: '0.8rem', color: 'var(--text-secondary)' },
  dishPrice: {
    fontSize: '1rem',
    fontWeight: '700',
    color: 'var(--primary)'
  }
};

export default RestaurantPage;