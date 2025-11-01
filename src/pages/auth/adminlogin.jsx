import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI, tokenManager } from '../../services/api';
import './Login.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');          // ajouté pour gérer les erreurs
  const [loading, setLoading] = useState(false);  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      const data = await authAPI.login(email, password);
  
      // stocker le token
      tokenManager.setToken(data);
  
      if (data.role === 'admin') {
        navigate('/admindashboard');
      } else {
        setError('Accès réservé aux administrateurs');
        tokenManager.clearToken();
      }
    } catch (err) {
      setError(err.message || 'Email ou mot de passe incorrect');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
         {error && <div style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          
           <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Connexion...' : 'Login'}</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;