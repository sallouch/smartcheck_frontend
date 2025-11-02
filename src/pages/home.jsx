
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Bienvenue sur SmartChek </h1>
        <p className="version-text">ISIMM</p>
      </div>
      
      <div className="user-selection">
<div className="user-card" onClick={() => navigate('/studentlogin')}>
  <h3>Etudiant</h3>
</div>

<div className="user-card" onClick={() => navigate('/teacherlogin')}>
  <h3>Enseignant</h3>
</div>

<div className="user-card" onClick={() => navigate('/adminlogin')}>
  <h3>Administrateur</h3>
</div>
      </div>
    </div>
  );
};

export default Home;