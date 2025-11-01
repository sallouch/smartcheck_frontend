import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Tableau de Bord Administrateur</h1>
        <button onClick={() => navigate('/')} className="logout-btn">
          Retour à l'accueil
        </button>
      </div>
      
      <div className="dashboard-content">
        <div className="dashboard-card" onClick={() => alert('Gestion utilisateurs')}>
          <h3> Gestion des Utilisateurs</h3>
          <p>Gérer les comptes étudiants, professeurs et administrateurs</p>
          <div className="card-stats">
            <span className="stat">1500 utilisateurs</span>
          </div>
        </div>
        
        <div className="dashboard-card" onClick={() => alert('Analytiques')}>
          <h3> Analytiques Système</h3>
          <p>Statistiques globales et rapports de présence</p>
          <div className="card-stats">
            <span className="stat">Taux présence global: 82%</span>
          </div>
        </div>
        
      
        
      </div>
    </div>
  );
};

export default AdminDashboard;