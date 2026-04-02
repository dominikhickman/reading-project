import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Button from './Button';

const Navbar = () => {
  const { role, currentUser, points, logout } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const goHome = () => {
    if (role === 'teacher') navigate('/teacher/dashboard');
    else if (role === 'student') navigate('/student/dashboard');
    else navigate('/');
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 30px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      boxShadow: 'var(--shadow-sm)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div 
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
        onClick={goHome}
      >
        <div style={{
          width: '40px', height: '40px', borderRadius: '50%', 
          backgroundColor: 'var(--accent-color)', display: 'flex', 
          justifyContent: 'center', alignItems: 'center', fontSize: '1.5rem'
        }}>
          📚
        </div>
        <h2 style={{ margin: 0, color: 'var(--primary-color)' }}>Reading Adventures</h2>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {role === 'student' && (
          <div style={{
            background: 'var(--accent-color)',
            padding: '5px 15px',
            borderRadius: '20px',
            fontWeight: 'bold',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            ⭐ {points} Points
          </div>
        )}
        
        {currentUser && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontWeight: 'bold' }}>
              Hi, {currentUser.name || currentUser.type}!
            </span>
            <Button size="sm" variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
