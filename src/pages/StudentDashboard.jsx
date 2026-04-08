import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const StudentDashboard = () => {
  const { monster, points, currentUser } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!monster) {
      navigate('/student/monster-select');
    }
  }, [monster, navigate]);

  if (!monster) return null;

  let level = 1;
  let scale = 1;
  if (points > 100 && points <= 300) { level = 2; scale = 1.15; }
  else if (points > 300) { level = 3; scale = 1.3; }

  const nextLevelThreshold = level === 1 ? 100 : level === 2 ? 300 : 9999;
  const progressToNext = level < 3 ? (points / nextLevelThreshold) * 100 : 100;

  return (
    <div className="container" style={{ paddingBottom: '60px' }}>
      


      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'stretch' }}>
        
        {/* Monster Display Widget */}
        <div className="glass-panel" style={{ 
          flex: '1', 
          minWidth: '250px',
          padding: '30px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          <h2 style={{ color: 'var(--primary-color)', fontSize: '2.2rem', marginBottom: '20px' }}>Your Buddy</h2>
          
          <div style={{ 
             height: '200px', 
             width: '200px',
             background: 'radial-gradient(circle, #fff, #f0f4f8)',
             borderRadius: '50%',
             display: 'flex', 
             justifyContent: 'center', 
             alignItems: 'center',
             position: 'relative',
             boxShadow: 'inset 0 0 20px rgba(0,0,0,0.05), var(--shadow-sm)'
          }}>
            <div 
              style={{
                fontSize: '6rem',
                transform: `scale(${scale})`,
                transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.2))'
              }}
            >
              {monster.icon}
            </div>
            
            {level > 1 && <div style={{ position: 'absolute', top: 20, right: 20, fontSize: '2rem' }}>✨</div>}
            {level > 2 && <div style={{ position: 'absolute', top: 30, left: 20, fontSize: '2rem' }}>🌟</div>}
          </div>
          
          <div style={{ 
            marginTop: '30px', 
            background: 'var(--secondary-color)', 
            color: 'white', 
            borderRadius: 'var(--radius-pill)', 
            padding: '8px 24px',
            fontSize: '1.4rem',
            fontWeight: 'bold',
            boxShadow: 'var(--shadow-sm)'
          }}>
            Level {level}
          </div>
          
          <div style={{ marginTop: '30px', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontWeight: 'bold', color: '#555', fontSize: '1.1rem' }}>
              <span>Progress to next Level</span>
              <span>{Math.floor(progressToNext)}%</span>
            </div>
            <div style={{ 
              height: '24px', 
              background: '#E2E8F0', 
              borderRadius: '12px', 
              overflow: 'hidden',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <div style={{ 
                width: `${Math.min(100, progressToNext)}%`, 
                height: '100%', 
                background: 'linear-gradient(90deg, var(--secondary-color), #20D0C4)',
                transition: 'width 1s ease-out'
              }}></div>
            </div>
          </div>
        </div>

        {/* Massive Game Button */}
        <div 
          onClick={() => navigate('/games/bee-match')}
          style={{ 
            flex: '1', 
            minWidth: '300px',
            background: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 99%, #FECFEF 100%)',
            borderRadius: 'var(--radius-lg)',
            padding: '40px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            boxShadow: 'var(--shadow-lg)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 25px 40px rgba(255, 154, 158, 0.4)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
          }}
        >
          {/* Decorative background bees */}
          <div style={{ position: 'absolute', top: '10%', left: '5%', fontSize: '3rem', opacity: 0.25, transform: 'rotate(-20deg)' }}>🐝</div>
          <div style={{ position: 'absolute', bottom: '15%', right: '8%', fontSize: '4rem', opacity: 0.25, transform: 'rotate(15deg)' }}>🌸</div>
          <div style={{ position: 'absolute', top: '20%', right: '15%', fontSize: '2.5rem', opacity: 0.25, transform: 'rotate(45deg)' }}>✨</div>
          <div style={{ position: 'absolute', bottom: '20%', left: '15%', fontSize: '2.5rem', opacity: 0.2, transform: 'rotate(-45deg)' }}>🍃</div>
          
          <div style={{ fontSize: '7rem', marginBottom: '15px', filter: 'drop-shadow(0 15px 15px rgba(0,0,0,0.15))', zIndex: 1 }}>🐝</div>
          <h2 style={{ fontSize: '2.8rem', color: '#D81B60', margin: '0 0 15px 0', textShadow: '2px 2px 0px rgba(255,255,255,0.8)', zIndex: 1 }}>
            Play Bee & Flower Match!
          </h2>
          <p style={{ 
            fontSize: '1.4rem', 
            color: '#880E4F', 
            fontWeight: 'bold', 
            maxWidth: '90%', 
            margin: '0 auto', 
            background: 'rgba(255,255,255,0.7)', 
            padding: '12px 24px', 
            borderRadius: 'var(--radius-pill)',
            zIndex: 1
          }}>
            Click here to start matching words and earn points for your Buddy!
          </p>
          
          <div style={{ marginTop: '35px', zIndex: 1 }}>
            <span style={{ 
              background: 'white', color: '#D81B60', padding: '14px 40px', 
              borderRadius: 'var(--radius-pill)', fontSize: '1.6rem', fontWeight: '900',
              boxShadow: 'var(--shadow-md)', display: 'inline-block'
            }}>
              START GAME ▶
            </span>
          </div>
        </div>
      </div>
      
      {/* Achievements Section */}
      <h2 style={{ marginTop: '70px', marginBottom: '30px', fontSize: '2.8rem', textAlign: 'center', color: 'var(--secondary-color)' }}>
        My Sticker Collection
      </h2>
      <div className="glass-panel" style={{ 
        display: 'flex', gap: '50px', flexWrap: 'wrap', justifyContent: 'center', 
        padding: '50px', background: 'rgba(255,255,255,0.8)'
      }}>
        <Sticker icon="🌟" earned={points >= 50} label="50 pts" />
        <Sticker icon="🚀" earned={points >= 150} label="150 pts" />
        <Sticker icon="💎" earned={points >= 300} label="300 pts" />
        <Sticker icon="👑" earned={points >= 500} label="500 pts" />
      </div>
      
    </div>
  );
};

const Sticker = ({ icon, earned, label }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
    <div style={{ 
      fontSize: '5rem', 
      opacity: earned ? 1 : 0.2,
      filter: earned ? 'drop-shadow(0 10px 20px rgba(0,0,0,0.25))' : 'grayscale(100%)',
      transform: earned ? 'scale(1.15)' : 'scale(0.9)',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    }}>
      {icon}
    </div>
    <span style={{ 
      fontWeight: '900', 
      fontSize: '1.3rem',
      color: earned ? 'var(--text-main)' : '#999',
      background: earned ? 'white' : 'transparent',
      padding: '6px 18px',
      borderRadius: '25px',
      boxShadow: earned ? 'var(--shadow-md)' : 'none',
      border: earned ? '2px solid #EEE' : 'none'
    }}>
      {label}
    </span>
  </div>
);

export default StudentDashboard;
