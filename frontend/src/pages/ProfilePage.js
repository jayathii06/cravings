import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from '../utils/axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    fetchMyReviews();
  }, []);

  const fetchMyReviews = async () => {
    try {
      const { data } = await axios.get('/reviews/my');
      setReviews(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (count) => {
    return [1, 2, 3, 4, 5].map(star => (
      <span key={star} style={{ color: star <= count ? '#F6A623' : '#E8D5C4' }}>★</span>
    ));
  };

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>

        <div style={styles.profileCard}>
          <div style={styles.avatar}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div style={styles.profileInfo}>
            <h1 style={styles.name}>{user?.name}</h1>
            <p style={styles.email}>📧 {user?.email}</p>
            <p style={styles.reviewCount}>🍽️ {reviews.length} reviews posted</p>
          </div>
        </div>

        <h2 style={styles.sectionTitle}>My Reviews</h2>

        {loading ? (
          <div style={styles.loading}>
            <div style={styles.spinner}></div>
            <p>Loading reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div style={styles.empty}>
            <p style={{ fontSize: '2.5rem' }}>💬</p>
            <p>You haven't reviewed anything yet</p>
            <button onClick={() => navigate('/')} style={styles.exploreBtn}>
              Explore Restaurants
            </button>
          </div>
        ) : (
          <div style={styles.reviewsList}>
            {reviews.map(review => (
              <div key={review._id} style={styles.reviewCard}>
                <div style={styles.reviewHeader}>
                  <div>
                    <p style={styles.dishName}>{review.dish?.name || 'Dish'}</p>
                    <p style={styles.restaurantName}>
                      📍 {review.dish?.restaurant?.name || 'Restaurant'}
                    </p>
                  </div>
                  <div style={styles.stars}>{renderStars(review.rating)}</div>
                </div>
                <p style={styles.comment}>{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: { minHeight: '100vh', background: 'var(--bg)' },
  container: { maxWidth: '800px', margin: '0 auto', padding: '2rem' },
  profileCard: {
    background: 'var(--white)',
    borderRadius: '20px',
    padding: '2rem',
    border: '1px solid var(--border)',
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    marginBottom: '2rem',
    boxShadow: '0 2px 12px rgba(193,127,90,0.06)'
  },
  avatar: {
    width: '80px', height: '80px',
    borderRadius: '50%',
    background: 'var(--primary)',
    color: 'var(--white)',
    display: 'flex', alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem', fontWeight: '800',
    flexShrink: 0
  },
  profileInfo: {},
  name: { fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.25rem' },
  email: { fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' },
  reviewCount: { fontSize: '0.9rem', color: 'var(--primary)', fontWeight: '500' },
  sectionTitle: { fontSize: '1.3rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '1rem' },
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
    cursor: 'pointer',
    fontSize: '0.9rem'
  },
  reviewsList: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  reviewCard: {
    background: 'var(--white)',
    borderRadius: '14px',
    padding: '1.25rem',
    border: '1px solid var(--border)'
  },
  reviewHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '0.75rem'
  },
  dishName: { fontWeight: '700', fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.2rem' },
  restaurantName: { fontSize: '0.82rem', color: 'var(--text-secondary)' },
  stars: { fontSize: '1rem' },
  comment: { fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }
};

export default ProfilePage;