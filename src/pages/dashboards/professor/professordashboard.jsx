/*import React from 'react';
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
          <h3> Gestion des Présences</h3>
          <p>Marquer et consulter les présences des étudiants</p>
          <div className="card-stats">
            <span className="stat">Session aujourd'hui: 14h-16h</span>
          </div>
        </div>
        
        <div className="dashboard-card" onClick={() => alert('Voir les cours')}>
          <h3> Mes Matières</h3>
          <p>Gérer le contenu de vos cours</p>
          <div className="card-stats">
            <span className="stat">3 matières assignées</span>
          </div>
        </div>
        
        <div className="dashboard-card" onClick={() => alert('Saisir les notes')}>
          <h3> Saisie des Notes d'oral</h3>
          <p>Entrer et modifier les notes des étudiants</p>
        </div>
        
        
      </div>
    </div>
  );
};

export default ProfessorDashboard;*/
/*
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { qrAPI, tokenManager } from '../../../services/api';


const ProfessorDashboard = () => {
  const navigate = useNavigate();
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrCodeData, setQrCodeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [teacherSessions, setTeacherSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState('');
  const [teacherInfo, setTeacherInfo] = useState(null);
  const [activeQRs, setActiveQRs] = useState([]);

  // Charger les données du professeur
  useEffect(() => {
    fetchTeacherData();
    fetchActiveQRs();
  }, []);

  const fetchTeacherData = async () => {
    try {
      const teacherId = tokenManager.getUserId();
      
      // Récupérer les sessions du professeur depuis votre backend
      const sessionsResponse = await fetch(`http://127.0.0.1:8000/sessions/teacher/${teacherId}`);
      if (sessionsResponse.ok) {
        const sessionsData = await sessionsResponse.json();
        setTeacherSessions(sessionsData.sessions || []);
      } else {
        // Fallback: utiliser les sessions existantes de la base
        await fetchSessionsFromDB();
      }
    } catch (error) {
      console.error('Erreur chargement données professeur:', error);
      await fetchSessionsFromDB();
    }
  };

  const fetchSessionsFromDB = async () => {
    try {
      // Utiliser votre endpoint existant pour récupérer toutes les sessions
      const response = await fetch('http://127.0.0.1:8000/sessions/');
      if (response.ok) {
        const data = await response.json();
        const teacherId = tokenManager.getUserId();
        
        // Filtrer les sessions du professeur connecté
        const teacherSessions = data.sessions.filter(session => 
          session.id_enseignant === teacherId
        );
        setTeacherSessions(teacherSessions);
      }
    } catch (error) {
      console.error('Erreur récupération sessions:', error);
    }
  };

  const fetchActiveQRs = async () => {
    try {
      const teacherId = tokenManager.getUserId();
      const result = await qrAPI.getActiveQR(teacherId);
      if (result.success) {
        setActiveQRs(result.active_qr_codes || []);
      }
    } catch (error) {
      console.error('Erreur récupération QR actifs:', error);
    }
  };

  // Sessions du jour avec les vraies données
  const getTodaySessions = () => {
    const today = new Date().toISOString().split('T')[0];
    return teacherSessions.filter(session => session.date === today);
  };

  // Sessions avec QR actif
  const getSessionsWithActiveQR = () => {
    return teacherSessions.filter(session => 
      activeQRs.some(qr => qr.id_seance === session.id)
    );
  };

  // Générer un QR code
  const generateQRCode = async (sessionId, dureeValidite = 30) => {
    setLoading(true);
    setError('');
    
    try {
      const result = await qrAPI.generateQR(sessionId, dureeValidite);
      
      if (result.success) {
        setQrCodeData(result);
        setShowQRModal(true);
        
        // Mettre à jour la liste des QR actifs
        await fetchActiveQRs();
      } else {
        setError(result.message || 'Erreur lors de la génération du QR code');
      }
    } catch (error) {
      setError('Erreur réseau: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateQR = () => {
    if (!selectedSession) {
      setError('Veuillez sélectionner une session');
      return;
    }
    generateQRCode(parseInt(selectedSession));
  };

  const downloadQRCode = () => {
    if (!qrCodeData?.qr_code_image) return;

    const session = teacherSessions.find(s => s.id === qrCodeData.id_seance);
    const fileName = `qr-${session?.nom_matiere || 'session'}-${new Date().getTime()}.png`;
    
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${qrCodeData.qr_code_image}`;
    link.download = fileName;
    link.click();
  };

  const closeQRModal = () => {
    setShowQRModal(false);
    setQrCodeData(null);
    setError('');
  };

  const handleViewAttendance = () => {
    const teacherId = tokenManager.getUserId();
    navigate(`/teacher/attendance-report/${teacherId}`);
  };

  const handleViewSessionDetails = (sessionId) => {
    navigate(`/teacher/session/${sessionId}`);
  };

  const todaySessions = getTodaySessions();
  const sessionsWithActiveQR = getSessionsWithActiveQR();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Tableau de Bord Professeur</h1>
          <p>Gestion des présences par QR Code</p>
        </div>
        <button onClick={() => navigate('/')} className="logout-btn">
          Déconnexion
        </button>
      </div>

      {/* Notifications *//*}
      {error && (
        <div className="attendance-error">
          ❌ {error}
        </div>
      )}

      {loading && (
        <div className="attendance-info">
           Génération du QR code en cours...
        </div>
      )}

      {/* QR Codes Actifs *//*}
      {sessionsWithActiveQR.length > 0 && (
        <div className="active-qr-banner">
          <div className="banner-content">
            <span className="banner-icon"></span>
            <div className="banner-text">
              <strong>{sessionsWithActiveQR.length} QR Code(s) actif(s)</strong>
              <span>Les étudiants peuvent scanner ces sessions</span>
            </div>
            <button 
              onClick={fetchActiveQRs}
              className="refresh-btn"
            >
               Actualiser
            </button>
          </div>
        </div>
      )}
      
      <div className="dashboard-content">
        {/* Carte Génération QR Code *//*}
        <div className="dashboard-card qr-generator-card">
          <div className="card-icon"></div>
          <h3>Générer QR Code</h3>
          <p>Créez un QR code pour la présence des étudiants</p>
          
          <div className="session-selection">
            <label>Sélectionnez une session:</label>
            <select 
              value={selectedSession} 
              onChange={(e) => setSelectedSession(e.target.value)}
              className="session-select"
            >
              <option value="">Choisir une session</option>
              {todaySessions.map(session => (
                <option key={session.id} value={session.id}>
                  {session.nom_matiere || `Session ${session.id}`} - 
                  {session.nom_classe || `Classe ${session.id_classe}`} 
                  ({session.heure_debut})
                </option>
              ))}
            </select>
          </div>

          <button 
            onClick={handleGenerateQR}
            disabled={loading || !selectedSession}
            className="generate-qr-btn"
          >
            {loading ? 'Génération...' : 'Générer QR Code (30s)'}
          </button>

          {todaySessions.length === 0 && (
            <p className="no-sessions">Aucune session prévue aujourd'hui</p>
          )}
        </div>

        {/* Carte Sessions avec QR Actifs *//*}
        <div className="dashboard-card active-sessions-card">
          <div className="card-icon"></div>
          <h3>Sessions Actives</h3>
          <p>QR codes en cours de validité</p>
          <div className="sessions-list">
            {sessionsWithActiveQR.length > 0 ? (
              sessionsWithActiveQR.map(session => (
                <div key={session.id} className="session-item active">
                  <div className="session-header">
                    <strong>{session.nom_matiere || `Session ${session.id}`}</strong>
                    <span className="session-status active">🟢 Actif</span>
                  </div>
                  <span className="session-details">
                    {session.nom_classe || `Classe ${session.id_classe}`} | 
                    {session.heure_debut} - {session.heure_fin}
                  </span>
                  <div className="session-actions">
                    <button 
                      onClick={() => handleViewSessionDetails(session.id)}
                      className="view-details-btn"
                    >
                      Détails
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-sessions-message">Aucun QR code actif</p>
            )}
          </div>
        </div>

        {/* Carte Sessions du Jour *//*}
        <div className="dashboard-card sessions-card">
          <div className="card-icon"></div>
          <h3>Sessions du Jour</h3>
          <p>Vos séances pour aujourd'hui</p>
          <div className="sessions-list">
            {todaySessions.length > 0 ? (
              todaySessions.map(session => {
                const isActive = sessionsWithActiveQR.some(qr => qr.id_seance === session.id);
                return (
                  <div key={session.id} className={`session-item ${isActive ? 'active' : ''}`}>
                    <div className="session-header">
                      <strong>{session.nom_matiere || `Session ${session.id}`}</strong>
                      <span className={`session-status ${isActive ? 'active' : 'planned'}`}>
                        {isActive ? '🟢 Actif' : '⚪ Planifiée'}
                      </span>
                    </div>
                    <span className="session-details">
                      {session.nom_classe || `Classe ${session.id_classe}`} | 
                      {session.heure_debut} - {session.heure_fin}
                    </span>
                    {session.code_matiere && (
                      <span className="session-code">{session.code_matiere}</span>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="no-sessions-message">Aucune session aujourd'hui</p>
            )}
          </div>
        </div>

        {/* Carte Rapport de Présence *//*}
        <div className="dashboard-card stats-card" onClick={handleViewAttendance}>
          <div className="card-icon"></div>
          <h3>Rapport de Présence</h3>
          <p>Consultez les statistiques de vos étudiants</p>
          <div className="quick-stats">
            <div className="quick-stat">
              <span className="stat-number">{todaySessions.length}</span>
              <span className="stat-label">Sessions aujourd'hui</span>
            </div>
            <div className="quick-stat">
              <span className="stat-number">{sessionsWithActiveQR.length}</span>
              <span className="stat-label">QR Actifs</span>
            </div>
          </div>
        </div>

        {/* Carte Toutes les Sessions *//*}
        <div className="dashboard-card all-sessions-card">
          <div className="card-icon"></div>
          <h3>Toutes mes Sessions</h3>
          <p>Vos séances à venir et passées</p>
          <div className="sessions-overview">
            <div className="overview-item">
              <span className="overview-number">{teacherSessions.length}</span>
              <span className="overview-label">Total sessions</span>
            </div>
            <div className="overview-item">
              <span className="overview-number">
                {teacherSessions.filter(s => new Date(s.date) >= new Date()).length}
              </span>
              <span className="overview-label">Sessions à venir</span>
            </div>
          </div>
        </div>

        {/* Carte Actions Rapides *//*}
        <div className="dashboard-card actions-card">
          <div className="card-icon">⚡</div>
          <h3>Actions Rapides</h3>
          <div className="quick-actions">
            <button 
              onClick={() => navigate('/teacher/new-session')}
              className="quick-action-btn"
            >
              ➕ Nouvelle Session 
            </button>
            <button 
              onClick={fetchActiveQRs}
              className="quick-action-btn"
            >
              🔄 Actualiser QR
            </button>
            <button 
              onClick={() => navigate('/teacher/students')}
              className="quick-action-btn"
            >
              👥 Liste Étudiants
            </button>
          </div>
        </div>
      </div>

      {/* Modal QR Code *//*}
      {showQRModal && qrCodeData && (
        <div className="qr-modal">
          <div className="qr-modal-content">
            <div className="qr-modal-header">
              <h2>QR Code Généré avec Succès</h2>
              <button onClick={closeQRModal} className="close-btn">✕</button>
            </div>
            
            <div className="qr-modal-body">
              <div className="qr-code-container">
                <img 
                  src={`data:image/png;base64,${qrCodeData.qr_code_image}`} 
                  alt="QR Code de présence"
                  className="qr-code-image"
                />
                
                <div className="qr-info-card">
                  <h4>Informations du QR Code</h4>
                  <div className="qr-details">
                    <div className="qr-detail">
                      <span className="detail-label">Session ID:</span>
                      <span className="detail-value">{qrCodeData.id_seance}</span>
                    </div>
                    <div className="qr-detail">
                      <span className="detail-label">Durée de validité:</span>
                      <span className="detail-value">{qrCodeData.duree_validite} secondes</span>
                    </div>
                    <div className="qr-detail">
                      <span className="detail-label">Expire à:</span>
                      <span className="detail-value">
                        {new Date(qrCodeData.expire_le).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="qr-instruction-card">
                  <h4>Instructions pour les étudiants</h4>
                  <p>Les étudiants doivent:</p>
                  <ol>
                    <li>Ouvrir l'application SmartCheck</li>
                    <li>Aller dans "Scanner QR Code"</li>
                    <li>Pointer la caméra vers ce code</li>
                    <li>La présence sera enregistrée automatiquement</li>
                  </ol>
                </div>
              </div>
              
              <div className="qr-modal-actions">
                <button onClick={downloadQRCode} className="download-btn">
                  📥 Télécharger QR Code
                </button>
                <button onClick={closeQRModal} className="cancel-btn">
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessorDashboard;*/

// ProfessorDashboard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const ProfessorDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' ou 'qrcode'

  const handleLogout = () => {
    // Votre logique de déconnexion
    navigate('/');
  };

  const handleHistoryClick = () => {
    navigate('/professor/history');
  };

  const handleStudentsClick = () => {
    navigate('/professor/students');
  };

  // Contenu du dashboard principal
  const renderDashboard = () => (
    <div className="dashboard-content">
      {/* Carte Générer QR Code */}
      <div 
        className="dashboard-card scanner-card" 
        onClick={() => setActiveTab('qrcode')}
      >
        <div className="card-icon"></div>
        <h3>Générer QR Code</h3>
        <p>Créez un QR code pour la présence des étudiants</p>
      </div>

      {/* Autres fonctionnalités existantes */}
      <div className="dashboard-card" onClick={handleStudentsClick}>
        <div className="card-icon">👨</div>
        <h3>Gérer les Étudiants</h3>
        <p>Consultez et gérez votre liste d'étudiants</p>
      </div>
      
      <div className="dashboard-card" onClick={handleHistoryClick}>
        <div className="card-icon"></div>
        <h3>Historique des Présences</h3>
        <p>Consultez l'historique complet des présences</p>
      </div>
      
      <div className="dashboard-card">
        <div className="card-icon"></div>
        <h3>Statistiques</h3>
        <p>Analyses et rapports de présence</p>
      </div>

      <div className="dashboard-card">
        <div className="card-icon">⚙️</div>
        <h3>Paramètres</h3>
        <p>Configurez vos préférences</p>
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>Tableau de Bord Professeur</h1>
          <p>Gérez vos cours et les présences des étudiants</p>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          Déconnexion
        </button>
      </div>

      {/* Navigation par onglets */}
      <div className="tab-navigation">
        <button 
          className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          📋 Tableau de Bord
        </button>
        <button 
          className={`tab-btn ${activeTab === 'qrcode' ? 'active' : ''}`}
          onClick={() => setActiveTab('qrcode')}
        >
          📷 QR Code
        </button>
      </div>

      {/* Contenu selon l'onglet sélectionné */}
      <div className="tab-content">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'qrcode' && <QRCodeGenerator />}
      </div>
    </div>
  );
};

export default ProfessorDashboard;