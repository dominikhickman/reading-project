import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Card from '../components/Card';

const MonsterSelect = () => {
  const { setMonster } = useAppContext();
  const navigate = useNavigate();

  const monsters = [
    { id: 'dino', name: 'Dino Buddy', icon: '🦖', color: '#00A699' },
    { id: 'dragon', name: 'Fire Dragon', icon: '🐉', color: '#FF5A5F' },
    { id: 'alien', name: 'Space Alien', icon: '👽', color: '#2ed573' },
    { id: 'unicorn', name: 'Magic Unicorn', icon: '🦄', color: '#9b59b6' },
    { id: 'robot', name: 'Robo Helper', icon: '🤖', color: '#3498db' },
    { id: 'crab', name: 'Snappy Crab', icon: '🦀', color: '#e74c3c' },
  ];

  const handleSelect = (monsterDef) => {
    setMonster(monsterDef);
    navigate('/student/dashboard');
  };

  return (
    <div className="container text-center">
      <h1 style={{ fontSize: '3rem', color: 'var(--primary-color)', marginBottom: '10px' }}>
        Pick Your Buddy!
      </h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '40px' }}>
        This buddy will grow stronger as you read and play!
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px' }}>
        {monsters.map(m => (
          <Card 
            key={m.id}
            onClick={() => handleSelect(m)}
            style={{
              width: '200px',
              cursor: 'pointer',
              transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1) translateY(-10px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1) translateY(0)'}
          >
            <div style={{ fontSize: '6rem', marginBottom: '15px' }}>
              {m.icon}
            </div>
            <h3 style={{ color: m.color, margin: 0 }}>{m.name}</h3>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MonsterSelect;
