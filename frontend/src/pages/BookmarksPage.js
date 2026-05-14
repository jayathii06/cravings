import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import RestaurantCard from '../components/RestaurantCard';
import axios from '../utils/axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const BookmarksPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      const { data } = await axios.get('/bookmarks');
      setBookmarks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
        <h1 style={styles.title}>🔖 Saved Restaurants</h1>
        <p style={styles.subtitle}>Your favourite spots in one place</p>

        {loading ? (
          <div style={styles.loading}>
            <div style={styles.spinner}></div>
            <p>Loading saved restaurants...</p>
          </div>
        ) : bookmarks.length === 0 ? (
          <div style={styles.empty}>
            <p style={{ fontSize: '2.5rem' }}>🔖</p>
            <p>No saved restaurants yet</p>
            <button onClick={() => navigate('/')} style={styles.exploreBtn}>
              Explore Restaurants
            </button>
          </div>
        ) : (
          <div style={styles.grid}>
            {bookmarks.map(restaurant => (
              <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: { minHeight: '100vh', background: 'var(--bg)' },
  container: { maxWidth: '1200px', margin: '0 auto', padding: '2rem' },
  title: { fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.25rem' },
  subtitle: { color: 'var(--text-secondary)', marginBottom: '2rem' },
  loading: { textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' },
  spinner: {
    width: '36px', height: '36px',
    border: '3px solid var(--border)',
    borderTop: '3px solid var(--primary)',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
    margin: '0 auto 1rem'
  },
  empty: { textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' },
  exploreBtn: {
    marginTop: '1rem',
    background: 'var(--primary)',
    color: 'var(--white)',
    padding: '0.75rem 1.5rem',
    borderRadius: '10px',
    border: 'none',
    fontWeight: '600',
    cursor: 'pointer'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5rem'
  }
};

export default BookmarksPage;