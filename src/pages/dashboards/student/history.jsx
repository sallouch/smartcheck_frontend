import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './History.css';

const History = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  // Données d'exemple pour l'historique
  const attendanceData = [
    { id: 1, date: '2024-01-15', course: 'Mathematics', status: 'Present', time: '09:00 AM' },
    { id: 2, date: '2024-01-16', course: 'Physics', status: 'Present', time: '10:30 AM' },
    { id: 3, date: '2024-01-17', course: 'Chemistry', status: 'Absent', time: '02:00 PM' },
    { id: 4, date: '2024-01-18', course: 'Mathematics', status: 'Present', time: '09:00 AM' },
    { id: 5, date: '2024-01-19', course: 'Computer Science', status: 'Late', time: '11:15 AM' },
  ];

  const filteredData = filter === 'all' 
    ? attendanceData 
    : attendanceData.filter(item => item.status.toLowerCase() === filter);

  const handleBackToDashboard = () => {
    navigate('/student-dashboard');
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'present': return 'status-present';
      case 'absent': return 'status-absent';
      case 'late': return 'status-late';
      default: return 'status-unknown';
    }
  };

  return (
    <div className="history-container">
      <div className="history-header">
        <button className="back-button" onClick={handleBackToDashboard}>
          ← Back to Dashboard
        </button>
        <h1>Attendance History</h1>
        <p>View your attendance records</p>
      </div>

      {/* Filtres */}
      <div className="filters-section">
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filter === 'present' ? 'active' : ''}`}
            onClick={() => setFilter('present')}
          >
            Present
          </button>
          <button 
            className={`filter-btn ${filter === 'absent' ? 'active' : ''}`}
            onClick={() => setFilter('absent')}
          >
            Absent
          </button>
          <button 
            className={`filter-btn ${filter === 'late' ? 'active' : ''}`}
            onClick={() => setFilter('late')}
          >
            Late
          </button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="stats-section">
        <div className="stat-card">
          <h3>Total Classes</h3>
          <p className="stat-number">{attendanceData.length}</p>
        </div>
        <div className="stat-card">
          <h3>Present</h3>
          <p className="stat-number present">
            {attendanceData.filter(item => item.status === 'Present').length}
          </p>
        </div>
        <div className="stat-card">
          <h3>Absent</h3>
          <p className="stat-number absent">
            {attendanceData.filter(item => item.status === 'Absent').length}
          </p>
        </div>
        <div className="stat-card">
          <h3>Attendance Rate</h3>
          <p className="stat-number rate">
            {Math.round((attendanceData.filter(item => item.status === 'Present').length / attendanceData.length) * 100)}%
          </p>
        </div>
      </div>

      {/* Liste d'historique */}
      <div className="history-list">
        <h2>Recent Attendance</h2>
        {filteredData.length === 0 ? (
          <div className="no-data">No attendance records found</div>
        ) : (
          <div className="attendance-table">
            <div className="table-header">
              <div>Date</div>
              <div>Course</div>
              <div>Time</div>
              <div>Status</div>
            </div>
            {filteredData.map((record) => (
              <div key={record.id} className="table-row">
                <div className="date-cell">{record.date}</div>
                <div className="course-cell">{record.course}</div>
                <div className="time-cell">{record.time}</div>
                <div className={`status-cell ${getStatusClass(record.status)}`}>
                  {record.status}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;