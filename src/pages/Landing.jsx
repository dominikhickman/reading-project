import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="container flex-center" style={{ flexDirection: 'column', minHeight: '80vh' }}>
      <h1>Welcome to Reading Adventures!</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Are you a teacher or a student?</p>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        <div 
          className="card text-center" 
          style={{ cursor: 'pointer', width: '250px' }}
          onClick={() => navigate('/login/teacher')}
        >
          <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>I'm a Teacher</h2>
          <p>Login to manage your class</p>
        </div>
        
        <div 
          className="card text-center" 
          style={{ cursor: 'pointer', width: '250px', borderColor: 'var(--primary-color)' }}
          onClick={() => navigate('/login/student')}
        >
          <h2 style={{ fontSize: '1.5rem', marginBottom: '10px', color: 'var(--primary-color)' }}>I'm a Student</h2>
          <p>Let's play and read!</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
