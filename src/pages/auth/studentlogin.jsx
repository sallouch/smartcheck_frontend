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
import React, { useState } from 'react';
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