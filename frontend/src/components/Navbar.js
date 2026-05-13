import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>🍽️ Truffle</Link>
      <div style={styles.links}>
        {user ? (
          <>
            <Link to="/profile" style={styles.link}>👤 {user.name}</Link>
            <Link to="/bookmarks" style={styles.link}>🔖 Saved</Link>
            <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Sign In</Link>
            <Link to="/register" style={styles.registerBtn}>Join Free</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem 2rem',
    background: 'var(--white)',
    borderBottom: '1px solid var(--border)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 2px 12px rgba(193, 127, 90, 0.06)'
  },
  logo: {
    fontSize: '1.4rem',
    fontWeight: '800',
    color: 'var(--primary)',
    letterSpacing: '-0.5px'
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem'
  },
  link: {
    color: 'var(--text-secondary)',
    fontWeight: '500',
    fontSize: '0.95rem',
    transition: 'color 0.2s'
  },
  logoutBtn: {
    background: 'transparent',
    color: 'var(--text-secondary)',
    fontWeight: '500',
    fontSize: '0.95rem',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    cursor: 'pointer'
  },
  registerBtn: {
    background: 'var(--primary)',
    color: 'var(--white)',
    fontWeight: '600',
    fontSize: '0.9rem',
    padding: '0.5rem 1.2rem',
    borderRadius: '8px'
  }
};

export default Navbar;