

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QrScanner from 'qr-scanner';
import { qrAPI, tokenManager, attendanceAPI } from '/src/services/api';
import './dashboard.css';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [showScanner, setShowScanner] = useState(false);
  const [attendanceStatus, setAttendanceStatus] = useState('');
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState('');
  const [studentInfo, setStudentInfo] = useState(null);
  const videoRef = useRef(null);
  const qrScannerRef = useRef(null);

  // Récupérer les infos de l'étudiant au chargement
  useEffect(() => {
    const fetchStudentInfo = async () => {
      try {
        const studentId = tokenManager.getUserId() || 1;
        const data = await attendanceAPI.getStudentStats(studentId);
        if (data.success) setStudentInfo(data);
      } catch (err) {
        console.error('Erreur récupération info étudiant:', err);
        setError("Impossible de récupérer les informations de l'étudian");
      }
    };
    fetchStudentInfo();
  }, []);

  // Envoyer le QR code scanné au backend
  const sendQRCodeToBackend = async (qrData) => {
    setScanning(true);
    setError('');
    try {
      // Format attendu: "SMARTCHECK:id_seance:token"
      const qrParts = qrData.split(':');
      if (qrParts.length !== 3 || qrParts[0] !== 'SMARTCHECK') {
        throw new Error('QR code invalide - Format incorrect');
      }

      const qrToken = qrParts[2];
      const studentId = tokenManager.getUserId() || 1;
      const result = await qrAPI.scanQR(qrToken, studentId);

      if (result.success) {
        setAttendanceStatus('success');
        setTimeout(() => {
          setAttendanceStatus('');
          setShowScanner(false);
          // Recharger les statistiques après un scan réussi
          fetchStudentInfo();
        }, 3000);
      } else {
        const errorMessage = typeof result.message === 'string'
          ? result.message
          : JSON.stringify(result.message || result);
        setError(errorMessage);
      }
    } catch (err) {
      setError(err.message || 'Erreur réseau lors du scan');
    } finally {
      setScanning(false);
    }
  };

  // Démarrer le scanner
  const startScanner = async () => {
    try {
      setScanning(true);
      setError('');
      qrScannerRef.current = new QrScanner(
        videoRef.current,
        (result) => {
          console.log('QR Code détecté:', result);
          if (qrScannerRef.current) qrScannerRef.current.stop();
          sendQRCodeToBackend(result.data);
        },
        { 
          highlightScanRegion: true, 
          highlightCodeOutline: true, 
          returnDetailedScanResult: true,
          maxScansPerSecond: 1 
        }
      );
      await qrScannerRef.current.start();
    } catch (err) {
      setError('Impossible d\'accéder à la caméra: ' + err.message);
      setScanning(false);
    }
  };

  useEffect(() => {
    if (showScanner && videoRef.current) startScanner();
    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.destroy();
        qrScannerRef.current = null;
      }
    };
  }, [showScanner]);

  const handleCloseScanner = () => {
    if (qrScannerRef.current) qrScannerRef.current.destroy();
    setShowScanner(false);
    setError('');
    setScanning(false);
  };

  const handleHistoryClick = () => {
    navigate('/student/history');
  };

  const handleManualAttendance = () => {
    setAttendanceStatus('manual');
    setTimeout(() => {
      setAttendanceStatus('');
    }, 3000);
  };

  const handleLogout = () => {
    tokenManager.clearToken();
    navigate('/');
  };

  // Fonction pour recharger les informations étudiant
  const fetchStudentInfo = async () => {
    try {
      const studentId = tokenManager.getUserId() || 1;
      const data = await attendanceAPI.getStudentStats(studentId);
      if (data.success) setStudentInfo(data);
    } catch (err) {
      console.error('Erreur récupération info étudiant:', err);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Tableau de Bord Étudiant</h1>
          <p>Bienvenue sur votre espace personnel</p>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          Déconnexion
        </button>
      </div>

     

      {/* Notifications */}
      {attendanceStatus === 'success' && (
        <div className="attendance-success">
           Présence enregistrée avec succès !
        </div>
      )}
      
      {attendanceStatus === 'manual' && (
        <div className="attendance-info">
           Fonctionnalité présence manuelle à venir
        </div>
      )}

      {error && (
        <div className="attendance-error">
           {error}
        </div>
      )}

      <div className="dashboard-content">
        {/* Carte Scan QR Code */}
        <div className="dashboard-card scanner-card" onClick={() => setShowScanner(true)}>
          <div className="card-icon"></div>
          <h3>Scanner QR Code</h3>
          <p>Scannez le code QR pour signaler votre présence en cours.</p>
        </div>

        {/* Autres fonctionnalités */}
        <div className="dashboard-card">
          <div className="card-icon"></div>
          <h3>Mes Cours</h3>
          <p>Consultez vos cours et votre emploi du temps</p>
        </div>
        
        <div className="dashboard-card history-card" onClick={handleHistoryClick}>
          <div className="card-icon"></div>
          <h3>Historique</h3>
          <p>Consultez votre historique de présence détaillé</p>
        </div>
        
        
      </div>

      {/* Modal Scanner QR Code */}
      {showScanner && (
        <div className="scanner-modal">
          <div className="scanner-content">
            <div className="scanner-header">
              <h2>Scanner QR Code</h2>
              <button onClick={handleCloseScanner}>✕</button>
            </div>
            
            <div className="scanner-area">
              <div className="qr-scanner-container">
                <video 
                  ref={videoRef} 
                  className="qr-video"
                />
                
                {scanning && !error && (
                  <div className="scanning-overlay">
                    <div className="scanning-animation"></div>
                    <p>Scan en cours... Pointez la caméra vers le QR code</p>
                  </div>
                )}
                
                {error && (
                  <div className="scanner-error">
                    <p>{error}</p>
                    <button onClick={startScanner} className="retry-btn">
                      Réessayer
                    </button>
                  </div>
                )}
              </div>
              
              <div className="scanner-instructions">
                <p>🔹 Placez le QR code dans le cadre</p>
                <p>🔹 Assurez-vous d'avoir une bonne luminosité</p>
                <p>🔹 La présence sera enregistrée automatiquement</p>
              </div>
              
              <div className="scanner-actions">
                <button 
                  className="cancel-btn" 
                  onClick={handleCloseScanner}
                  disabled={scanning}
                >
                  Annuler
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