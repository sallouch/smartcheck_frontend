import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Tableau de Bord Étudiant</h1>
        <button onClick={() => navigate('/')} className="logout-btn">
          Retour à l'accueil
        </button>
      </div>
      
      <div className="dashboard-content">
        <div className="dashboard-card" onClick={() => alert('Voir les présences')}>
          <h3>📊 Mes Présences</h3>
          <p>Consulter mon historique de présence</p>
          <div className="card-stats">
            <span className="stat">Taux de présence: 85%</span>
          </div>
        </div>
        
        <div className="dashboard-card" onClick={() => alert('Voir les cours')}>
          <h3>📚 Mes Cours</h3>
          <p>Accéder à mes matières et emploi du temps</p>
          <div className="card-stats">
            <span className="stat">5 cours cette semaine</span>
          </div>
        </div>
        
        <div className="dashboard-card" onClick={() => alert('Voir les notes')}>
          <h3>🎯 Mes Notes</h3>
          <p>Consulter mes résultats académiques</p>
          <div className="card-stats">
            <span className="stat">Moyenne: 14.5/20</span>
          </div>
        </div>
        
        <div className="dashboard-card" onClick={() => alert('Profil')}>
          <h3>👤 Mon Profil</h3>
          <p>Gérer mes informations personnelles</p>
          <div className="card-stats">
            <span className="stat">Informations à jour</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;