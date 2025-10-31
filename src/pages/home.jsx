/*import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Welcome To SmartChek !</h1>
        <p className="version-text">ISIMM Version</p>
      </div>
      
      <div className="user-selection">
        <div className="user-cards">
          <div className="user-card" onClick={() => navigate('/student-login')}>
            <div className="card-icon">🎓</div>
            <h3>Student</h3>
            <p>Access your portal</p>
          </div>
          
          <div className="user-card" onClick={() => navigate('/professor-login')}>
            <div className="card-icon">👨‍🏫</div>
            <h3>Teacher</h3>
            <p>Access your portal</p>
          </div>
          
          <div className="user-card" onClick={() => navigate('/admin-login')}>
            <div className="card-icon">⚙️</div>
            <h3>Admin</h3>
            <p>Access your portal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
*/
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Welcome To SmartChek </h1>
        <p className="version-text">ISIMM</p>
      </div>
      
      <div className="user-selection">
<div className="user-card" onClick={() => navigate('/login')}>
  <h3>Student</h3>
</div>

<div className="user-card" onClick={() => navigate('/login')}>
  <h3>Teacher</h3>
</div>

<div className="user-card" onClick={() => navigate('/login')}>
  <h3>Admin</h3>
</div>
      </div>
    </div>
  );
};

export default Home;