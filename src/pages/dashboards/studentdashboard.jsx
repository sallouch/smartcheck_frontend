/*import React from 'react';
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
*/


/*
import React, { useState } from 'react';
import './dashboard.css';

const StudentDashboard = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [attendanceStatus, setAttendanceStatus] = useState('');

  const handleScan = () => {
    // Simulation de scan réussi
    setAttendanceStatus('success');
    setTimeout(() => {
      setAttendanceStatus('');
      setShowScanner(false);
    }, 3000);
  };

  const handleManualAttendance = () => {
    setAttendanceStatus('manual');
    setTimeout(() => {
      setAttendanceStatus('');
    }, 3000);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Student Dashboard</h1>
        <p>Welcome to your student portal</p>
      </div>

      {/* Notification de présence */
      /*{attendanceStatus === 'success' && (
        <div className="attendance-success">
          ✅ Presence marked successfully!
        </div>
      )}
      
      {attendanceStatus === 'manual' && (
        <div className="attendance-info">
          📝 Manual attendance requested
        </div>
      )}

      <div className="dashboard-content">
        {/* Carte Scan QR Code */
       /* <div className="dashboard-card scanner-card" onClick={() => setShowScanner(true)}>
          <div className="card-icon">📷</div>
          <h3>Scan QR Code</h3>
          <p>Scan the QR code to mark your presence</p>
        </div>

        {/* Autres fonctionnalités */
        /*<div className="dashboard-card">
          <div className="card-icon">📚</div>
          <h3>My Courses</h3>
          <p>View your enrolled courses and schedule</p>
        </div>
        
        <div className="dashboard-card">
          <div className="card-icon">📊</div>
          <h3>Attendance</h3>
          <p>Check your attendance records</p>
        </div>
        
        <div className="dashboard-card">
          <div className="card-icon">🎯</div>
          <h3>Grades</h3>
          <p>View your academic performance</p>
        </div>

        {/* Option de présence manuelle */
        /*<div className="dashboard-card manual-card" onClick={handleManualAttendance}>
          <div className="card-icon">✍️</div>
          <h3>Manual Attendance</h3>
          <p>Request manual attendance marking</p>
        </div>
      </div>

      {/* Modal Scanner QR Code */
      /*{showScanner && (
        <div className="scanner-modal">
          <div className="scanner-content">
            <div className="scanner-header">
              <h2>Scan QR Code</h2>
              <button onClick={() => setShowScanner(false)}>✕</button>
            </div>
            
            <div className="scanner-area">
              <div className="qr-placeholder">
                <div className="qr-animation"></div>
                <p>Position the QR code within the frame</p>
              </div>
              
              <button className="scan-btn" onClick={handleScan}>
                Simulate Scan
              </button>
              
              <button className="cancel-btn" onClick={() => setShowScanner(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;*/

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [showScanner, setShowScanner] = useState(false);
  const [attendanceStatus, setAttendanceStatus] = useState('');
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Démarrer la caméra quand le modal s'ouvre
  useEffect(() => {
    if (showScanner) {
      startCamera();
    } else {
      stopCamera();
    }
  }, [showScanner]);

  const startCamera = async () => {
    try {
      console.log('🎥 Démarrage de la caméra...');
      
      // Demander l'accès à la caméra
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment' // Caméra arrière sur mobile
        } 
      });
      
      console.log('✅ Caméra démarrée avec succès');
      streamRef.current = stream;
      
      // Afficher le flux vidéo dans la balise video
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      
    } catch (error) {
      console.error('❌ Erreur caméra:', error);
      alert(`Impossible d'accéder à la caméra: ${error.message}`);
      setShowScanner(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      console.log('🛑 Arrêt de la caméra');
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const handleScanClick = () => {
    console.log('📱 Bouton Scan cliqué');
    setShowScanner(true);
  };

  const handleScanSuccess = () => {
    // Simulation de scan réussi
    setAttendanceStatus('success');
    setTimeout(() => {
      setAttendanceStatus('');
      setShowScanner(false);
    }, 3000);
  };

  const handleCloseScanner = () => {
    setShowScanner(false);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Student Dashboard</h1>
        <button onClick={() => navigate('/')} className="logout-btn">
          Retour à l'accueil
        </button>
      </div>

      {attendanceStatus === 'success' && (
        <div className="attendance-success">
          ✅ Presence marked successfully!
        </div>
      )}

      <div className="dashboard-content">
        {/* Carte Scan QR Code */}
        <div className="dashboard-card scanner-card" onClick={handleScanClick}>
          <div className="card-icon">📷</div>
          <h3>Scan QR Code</h3>
          <p>Scan the QR code to mark your presence</p>
        </div>

        {/* Autres cartes */}
        <div className="dashboard-card">
          <div className="card-icon">📚</div>
          <h3>My Courses</h3>
          <p>View your enrolled courses and schedule</p>
        </div>
        
        <div className="dashboard-card">
          <div className="card-icon">📊</div>
          <h3>Attendance</h3>
          <p>Check your attendance records</p>
        </div>
      </div>

      {/* Modal Scanner avec vraie caméra */}
      {showScanner && (
        <div className="scanner-modal">
          <div className="scanner-content">
            <div className="scanner-header">
              <h2>Scan QR Code</h2>
              <button onClick={handleCloseScanner}>✕</button>
            </div>
            
            <div className="scanner-area">
              {/* Zone de la caméra */}
              <div className="camera-container">
                <video 
                  ref={videoRef}
                  className="camera-video"
                  autoPlay
                  playsInline
                  muted
                />
                <div className="scan-frame"></div>
              </div>
              
              <p className="scan-instruction">
                Pointez la caméra vers le QR code
              </p>
              
              <div className="scanner-buttons">
                <button className="scan-btn" onClick={handleScanSuccess}>
                  Simuler Scan Réussi
                </button>
                <button className="cancel-btn" onClick={handleCloseScanner}>
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

export default StudentDashboard;