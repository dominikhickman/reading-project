import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppContext } from './context/AppContext';
import Navbar from './components/Navbar';

// Placeholders for Pages
import Landing from './pages/Landing';
import TeacherLogin from './pages/TeacherLogin';
import StudentLogin from './pages/StudentLogin';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import MonsterSelect from './pages/MonsterSelect';
import BeeFlowerGame from './pages/games/BeeFlowerGame';

function App() {
  const { role } = useAppContext();

  return (
    <div className="main-content" style={{ padding: 0 }}>
      {/* Navbar appears on all pages */}
      <Navbar />
      <div style={{ padding: '20px', width: '100%' }}>
        <Routes>
        <Route path="/" element={<Landing />} />
        
        {/* Auth Routes */}
        <Route path="/login/teacher" element={<TeacherLogin />} />
        <Route path="/login/student" element={<StudentLogin />} />

        {/* Teacher Routes */}
        <Route 
          path="/teacher/dashboard" 
          element={role === 'teacher' ? <TeacherDashboard /> : <Navigate to="/" />} 
        />

        {/* Student Routes */}
        <Route 
          path="/student/dashboard" 
          element={role === 'student' ? <StudentDashboard /> : <Navigate to="/" />} 
        />
        <Route 
          path="/student/monster-select" 
          element={role === 'student' ? <MonsterSelect /> : <Navigate to="/" />} 
        />

        {/* Game Routes */}
        <Route path="/games/bee-match" element={<BeeFlowerGame />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
