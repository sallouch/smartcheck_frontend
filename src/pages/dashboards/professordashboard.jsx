import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfessorDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Tableau de Bord Professeur</h1>
        <button onClick={() => navigate('/')} className="logout-btn">
          Retour à l'accueil
        </button>
      </div>
      
      <div className="dashboard-content">
        <div className="dashboard-card" onClick={() => alert('Gérer les présences')}>
          <h3>👥 Gestion des Présences</h3>
          <p>Marquer et consulter les présences des étudiants</p>
          <div className="card-stats">
            <span className="stat">Session aujourd'hui: 14h-16h</span>
          </div>
        </div>
        
        <div className="dashboard-card" onClick={() => alert('Voir les cours')}>
          <h3>📖 Mes Matières</h3>
          <p>Gérer le contenu de vos cours</p>
          <div className="card-stats">
            <span className="stat">3 matières assignées</span>
          </div>
        </div>
        
        <div className="dashboard-card" onClick={() => alert('Saisir les notes')}>
          <h3>✏️ Saisie des Notes</h3>
          <p>Entrer et modifier les notes des étudiants</p>
          <div className="card-stats">
            <span className="stat">15 notes à saisir</span>
          </div>
        </div>
        
        <div className="dashboard-card" onClick={() => alert('Statistiques')}>
          <h3>📈 Statistiques</h3>
          <p>Analyser les performances de la classe</p>
          <div className="card-stats">
            <span className="stat">Moyenne classe: 13.2/20</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessorDashboard;