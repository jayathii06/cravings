import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from '../utils/axios';

const CUISINES = ['Biryani', 'Haleem', 'Waffles', 'Desserts', 'Chinese', 'Pizza', 'South Indian', 'Fast Food', 'Cafe', 'Other'];

const AddRestaurant = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', description: '', cuisine: 'Biryani', area: '', city: 'Hyderabad'
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      let imageUrl = '';
      if (image) {
        const imageData = new FormData();
        imageData.append('image', image);
        const { data: uploadData } = await axios.post('/upload', imageData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        imageUrl = uploadData.url;
      }

      const { data } = await axios.post('/restaurants', {
        ...formData,
        image: imageUrl
      });

      navigate(`/restaurants/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>Add a Restaurant</h1>
          <p style={styles.subtitle}>Share a great food spot with the community</p>

          {error && <div style={styles.error}>{error}</div>}

          <form onSubmit={handleSubmit} style={styles.form}>

            <div style={styles.imageUpload}>
              {imagePreview ? (
                <img src={imagePreview} alt="preview" style={styles.preview} />
              ) : (
                <div style={styles.imagePlaceholder}>
                  <span style={{ fontSize: '2rem' }}>📸</span>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Upload restaurant photo</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={styles.fileInput}
                id="restaurantImage"
              />
              <label htmlFor="restaurantImage" style={styles.uploadBtn}>
                {imagePreview ? 'Change Photo' : 'Choose Photo'}
              </label>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Restaurant Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Hotel Shadab"
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="What makes this place special..."
                style={styles.textarea}
                rows={3}
              />
            </div>

            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Cuisine *</label>
                <select
                  name="cuisine"
                  value={formData.cuisine}
                  onChange={handleChange}
                  style={styles.input}
                >
                  {CUISINES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Area *</label>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="Banjara Hills"
                  style={styles.input}
                  required
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>City *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Hyderabad"
                style={styles.input}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={loading ? { ...styles.btn, opacity: 0.7 } : styles.btn}
            >
              {loading ? 'Adding Restaurant...' : 'Add Restaurant 🍽️'}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: { minHeight: '100vh', background: 'var(--bg)' },
  container: { maxWidth: '600px', margin: '0 auto', padding: '2rem' },
  card: {
    background: 'var(--white)',
    borderRadius: '20px',
    padding: '2rem',
    border: '1px solid var(--border)',
    boxShadow: '0 2px 12px rgba(193,127,90,0.06)'
  },
  title: { fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.25rem' },
  subtitle: { color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' },
  error: {
    background: '#FFF5F5', color: '#E53E3E',
    padding: '0.75rem 1rem', borderRadius: '10px',
    marginBottom: '1rem', fontSize: '0.875rem',
    border: '1px solid #FED7D7'
  },
  form: { display: 'flex', flexDirection: 'column', gap: '1.25rem' },
  imageUpload: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' },
  preview: { width: '100%', height: '200px', objectFit: 'cover', borderRadius: '12px' },
  imagePlaceholder: {
    width: '100%', height: '160px',
    background: 'var(--surface)',
    borderRadius: '12px',
    border: '2px dashed var(--border)',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
  },
  fileInput: { display: 'none' },
  uploadBtn: {
    background: 'var(--surface)',
    color: 'var(--primary)',
    border: '1.5px solid var(--primary)',
    padding: '0.5rem 1.2rem',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '0.875rem',
    cursor: 'pointer'
  },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 },
  label: { fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-primary)' },
  input: {
    padding: '0.75rem 1rem',
    borderRadius: '10px',
    border: '1.5px solid var(--border)',
    background: 'var(--surface)',
    fontSize: '0.95rem',
    color: 'var(--text-primary)',
    fontFamily: 'Segoe UI, sans-serif'
  },
  textarea: {
    padding: '0.75rem 1rem',
    borderRadius: '10px',
    border: '1.5px solid var(--border)',
    background: 'var(--surface)',
    fontSize: '0.95rem',
    color: 'var(--text-primary)',
    fontFamily: 'Segoe UI, sans-serif',
    resize: 'vertical'
  },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
  btn: {
    background: 'var(--primary)',
    color: 'var(--white)',
    padding: '0.875rem',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    marginTop: '0.5rem'
  }
};

export default AddRestaurant;