/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const StudentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique de connexion ici
    switch(userType) {
      case 'student':
        navigate('/student-dashboard');
        break;
      case 'teacher':
        navigate('/professor-dashboard');
        break;
      case 'admin':
        navigate('/admin-dashboard');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login to SmartChek</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="input"
              placeholder="CIN"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
*/
/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
const StudentLogin = () => {
  const [cin, setCin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/studentdashboard');
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="email"
              value={cin}
              onChange={(e) => setCin(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;
*/

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { authAPI, tokenManager } from '../../services/api';

const StudentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Appel à votre backend FastAPI
      const response = await authAPI.login(email, password);
      
      // Stocker le token
      tokenManager.setToken(response);
      
      // Rediriger selon le rôle
      if (response.role === 'etudiant') {
        navigate('/studentdashboard');
      } else {
        setError('Accès réservé aux étudiants');
        tokenManager.clearToken();
      }
    } catch (error) {
      setError('Email ou mot de passe incorrect');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Student Login</h2>
        
        {error && (
          <div style={{ 
            color: 'red', 
            marginBottom: '15px', 
            textAlign: 'center' 
          }}>
            {error}
          </div>
        )}
        
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
            {loading ? 'Connexion...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;