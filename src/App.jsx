import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import StudentLogin from './pages/auth/studentlogin'
import TeacherLogin from './pages/auth/teacherlogin'
import AdminLogin from './pages/auth/adminlogin'
import StudentDashboard from "./pages/dashboards/student/studentdashboard";
import ProfessorDashboard from "./pages/dashboards/professor/professordashboard";
import AdminDashboard from "./pages/dashboards/admin/admindashboard";
import React from 'react';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/studentlogin" element={<StudentLogin />} />
          <Route path="/teacherlogin" element={<TeacherLogin />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/studentdashboard" element={<StudentDashboard />}/>
          <Route path="/professordashboard" element={<ProfessorDashboard />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
