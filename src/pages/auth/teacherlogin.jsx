import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const TeacherLogin = () => {
  const [cin, setCin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/professordashboard');
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

export default TeacherLogin;