import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<div>Home Page Coming Soon</div>} />
          <Route path="/login" element={<div>Login Page Coming Soon</div>} />
          <Route path="/register" element={<div>Register Page Coming Soon</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;