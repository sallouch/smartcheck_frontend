

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { qrAPI } from '/src/services/api';

const QRCodeGenerator = () => {
  const [qrImage, setQrImage] = useState('');
  const [qrToken, setQrToken] = useState('');
  const [expireTime, setExpireTime] = useState('');
  const [studentId, setStudentId] = useState('');
  const [scanResult, setScanResult] = useState('');
  const [loading, setLoading] = useState(false);

  // ---------------- Génération QR code ----------------
  const generateQRCode = async () => {
    setLoading(true);
    try {
      const data = await qrAPI.generateQR(1, 300); // ID séance = 1, durée validité = 300s (5min)
      if (data.success) {
        setQrImage(`data:image/png;base64,${data.qr_code_image}`);
        setQrToken(data.qr_token);
        setExpireTime(data.expire_le);
        setScanResult('');
      }
    } catch (err) {
      console.error(err);
      alert('Impossible de générer le QR code. Vérifie le serveur.');
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Scan QR code pour un étudiant ----------------
  const scanQRCode = async () => {
    if (!qrToken || !studentId) {
      alert("Veuillez entrer le QR token et l'ID étudiant.");
      return;
    }

    try {
      const data = await qrAPI.scanQR(qrToken, Number(studentId));
      setScanResult(`Succès : ${data.message}`);
    } catch (err) {
      console.error(err);
      setScanResult(`Erreur : ${err.message}`);
    }
  };

  return (
    <div className="qr-generator-container">
      
      {/* Section Génération QR Code */}
      <div className="dashboard-card">
        <div className="card-icon"></div>
        <h3>Générer QR Code</h3>
        <p>Créez un nouveau QR code pour la séance en cours</p>
        
        <button 
          onClick={generateQRCode} 
          disabled={loading}
          className="generate-btn"
        >
          {loading ? 'Génération...' : 'Générer QR Code'}
        </button>

        {qrImage && (
          <div className="qr-result">
            <img src={qrImage} alt="QR Code" className="qr-image" />
            <div className="qr-info">
              <p><strong>Token :</strong> <code>{qrToken}</code></p>
              <p><strong>Expire le :</strong> {new Date(expireTime).toLocaleString()}</p>
            </div>
          </div>
        )}
      </div>

      
    </div>
  );
};

const ProfessorDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogout = () => {
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

      {/* Autres fonctionnalités */}
      <div className="dashboard-card" onClick={handleStudentsClick}>
        <div className="card-icon"></div>
        <h3>Gérer les Étudiants</h3>
        <p>Consultez et gérez votre liste d'étudiants</p>
      </div>
      
      <div className="dashboard-card" onClick={handleHistoryClick}>
        <div className="card-icon"></div>
        <h3>Historique des Présences</h3>
        <p>Consultez l'historique complet des présences</p>
      </div>
      
      

      
    </div>
  );

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>Tableau de Bord Professeur</h1>
         
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
           Tableau de Bord
        </button>
        <button 
          className={`tab-btn ${activeTab === 'qrcode' ? 'active' : ''}`}
          onClick={() => setActiveTab('qrcode')}
        >
           Générateur QR Code
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