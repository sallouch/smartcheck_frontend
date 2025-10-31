import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from './pages/auth/login'
import StudentDashboard from "./pages/studentdashboard";
import ProfessorDashboard from "./pages/professordashboard";
import AdminDashboard from "./pages/admindashboard";
import React from 'react';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/professor" element={<ProfessorDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
