import { Link } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
  return (
    <Link to={`/restaurants/${restaurant._id}`} style={styles.link}>
      <div style={styles.card}>
        <div style={styles.imageContainer}>
          {restaurant.image ? (
            <img src={restaurant.image} alt={restaurant.name} style={styles.image} />
          ) : (
            <div style={styles.placeholder}>🍽️</div>
          )}
          <div style={styles.cuisineBadge}>{restaurant.cuisine}</div>
        </div>
        <div style={styles.content}>
          <h3 style={styles.name}>{restaurant.name}</h3>
          <p style={styles.description}>{restaurant.description || 'A great place to eat'}</p>
          <div style={styles.footer}>
            <span style={styles.location}>📍 {restaurant.area}, {restaurant.city}</span>
            <span style={styles.arrow}>→</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

const styles = {
  link: {
    textDecoration: 'none',
    color: 'inherit'
  },
  card: {
    background: 'var(--white)',
    borderRadius: '16px',
    overflow: 'hidden',
    border: '1px solid var(--border)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
    boxShadow: '0 2px 12px rgba(193, 127, 90, 0.06)'
  },
  imageContainer: {
    position: 'relative',
    height: '180px',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  placeholder: {
    width: '100%',
    height: '100%',
    background: 'var(--surface)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '3rem'
  },
  cuisineBadge: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    background: 'var(--primary)',
    color: 'var(--white)',
    padding: '0.25rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '600'
  },
  content: {
    padding: '1.1rem'
  },
  name: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
    marginBottom: '0.4rem'
  },
  description: {
    fontSize: '0.875rem',
    color: 'var(--text-secondary)',
    marginBottom: '0.75rem',
    lineHeight: '1.5',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  location: {
    fontSize: '0.8rem',
    color: 'var(--text-secondary)'
  },
  arrow: {
    color: 'var(--primary)',
    fontWeight: '700'
  }
};

export default RestaurantCard;