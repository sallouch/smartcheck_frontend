
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

const StudentDashboard = () => {
   const navigate = useNavigate();
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
 const handleHistoryClick = () => {
    navigate('/student/history');
  };
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Student Dashboard</h1>
         <button onClick={() => navigate('/')} className="logout-btn">
          Retour à l'accueil
        </button>
      </div>

      {/* Notification de présence */}
      {attendanceStatus === 'success' && (
        <div className="attendance-success">
           Presence marked successfully!
        </div>
      )}
      
      

      <div className="dashboard-content">
        {/* Carte Scan QR Code */}
        <div className="dashboard-card scanner-card" onClick={() => setShowScanner(true)}>
          <div className="card-icon"></div>
          <h3> QR Code</h3>
          <p>Scannez le code QR pour signaler votre présence.</p>
        </div>

        {/* Autres fonctionnalités */}
        <div className="dashboard-card">
          <div className="card-icon"></div>
          <h3>Mes Cours</h3>
          <p>Consultez vos cours et votre emploi du temps</p>
        </div>
        
        <div className="dashboard-card"  onClick={handleHistoryClick}>
          <div className="card-icon"></div>
          <h3>Historique</h3>
          <p>consulter votre historique de presence</p>
        </div>
        
        
        
      </div>

      {/* Modal Scanner QR Code */}
      {showScanner && (
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

export default StudentDashboard;