import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import Button from '../../components/Button';

const VOCABULARY = [
  { word: 'fast', description: 'moving very quickly' },
  { word: 'big', description: 'large in size' },
  { word: 'happy', description: 'feeling joy or smiling' },
  { word: 'jump', description: 'to push yourself up into the air' },
  { word: 'read', description: 'to look at and understand words' },
  { word: 'sun', description: 'the bright star that gives daylight' },
  { word: 'tree', description: 'a tall plant with a trunk and leaves' },
  { word: 'dog', description: 'a furry pet that barks' },
  { word: 'apple', description: 'a red or green fruit that is sweet' },
  { word: 'water', description: 'what we drink when thirsty' },
  { word: 'book', description: 'pages with words you can read' },
  { word: 'sleep', description: 'to rest with closed eyes' }
];

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

const BeeFlowerGame = () => {
  const { addPoints, currentUser } = useAppContext();
  const navigate = useNavigate();

  const [roundWords, setRoundWords] = useState([]);
  const [flowers, setFlowers] = useState([]);
  const [matchedWords, setMatchedWords] = useState([]);
  
  const [message, setMessage] = useState('');
  const [sessionPoints, setSessionPoints] = useState(0);

  const loadNewRound = () => {
    setMessage('');
    setMatchedWords([]);
    
    // Determine number of flowers based on difficulty
    const difficultyLevel = currentUser?.difficulty || 'Medium';
    let targetWords = 6; // Medium default
    if (difficultyLevel === 'Easy') targetWords = 3;
    if (difficultyLevel === 'Hard') targetWords = 9;

    // Pick random distinct words from the vocabulary
    const shuffledVocab = shuffleArray(VOCABULARY);
    const selected = shuffledVocab.slice(0, targetWords);
    
    // Shuffle the round words for the "Bee Bank"
    setRoundWords(shuffleArray(selected));
    // Shuffle another copy for the "Flowers" array
    setFlowers(shuffleArray(selected));
  };

  useEffect(() => {
    loadNewRound();
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    
    const draggableId = result.draggableId; // "bee-apple"
    const word = draggableId.replace('bee-', '');
    
    const droppableId = result.destination.droppableId; // "flower-0"
    
    if (droppableId.startsWith('flower-')) {
      const flowerIndex = parseInt(droppableId.split('-')[1]);
      const flower = flowers[flowerIndex];
      
      if (word === flower.word) {
        // Correct match!
        setMatchedWords(prev => {
          const newMatched = [...prev, word];
          if (newMatched.length === roundWords.length && roundWords.length > 0) {
             setMessage('🎉 You matched all the flowers! Loading next level...');
             setSessionPoints(pts => pts + 10);
             addPoints(10);
             setTimeout(loadNewRound, 3000);
          } else {
             setMessage('✨ Great job! +10 Points!');
             setSessionPoints(pts => pts + 10);
             addPoints(10);
          }
          return newMatched;
        });
      } else {
        setMessage('Oops, that bee doesn\'t belong to that flower. Try again!');
      }
    }
  };

  // Filter bees that haven't been matched yet
  const remainingBees = roundWords.filter(w => !matchedWords.includes(w.word));

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Button onClick={() => navigate('/student/dashboard')} variant="secondary">← Back to Dashboard</Button>
        <h2 style={{ color: 'var(--primary-color)', margin: 0, fontSize: '2rem' }}>Points Earned: {sessionPoints}</h2>
      </div>

      <h1 style={{ marginBottom: '10px' }}>Bee & Flower Matching!</h1>
      <p style={{ fontSize: '1.4rem', color: '#666', marginBottom: '20px' }}>
        Drag the bees to the flowers that match their words to help your Buddy grow.
      </p>

      {message && (
        <div style={{ 
          margin: '0 auto 30px auto', 
          padding: '15px 30px', 
          borderRadius: '15px',
          background: message.includes('Oops') ? '#FFEBE6' : '#E3FCEF',
          color: message.includes('Oops') ? '#BF2600' : '#006644',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          display: 'inline-block',
          boxShadow: 'var(--shadow-md)'
        }}>
          {message}
        </div>
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        
        {/* The Bee Bank */}
        <div style={{
          background: '#d4f1f9',
          border: '4px dashed #6cb2eb',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '50px',
          minHeight: '160px'
        }}>
          <h2 style={{ margin: '0 0 20px 0', color: '#2b6cb0' }}>Waitin' Bees</h2>
          <Droppable droppableId="bee-bank" direction="horizontal" isDropDisabled={true}>
            {(provided) => (
              <div 
                ref={provided.innerRef} 
                {...provided.droppableProps}
                style={{
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '30px', 
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {remainingBees.map((item, index) => (
                  <Draggable key={item.word} draggableId={`bee-${item.word}`} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          background: '#FFD700', // yellow bee color
                          border: '5px solid #333', // bold outline
                          color: '#333',
                          borderRadius: '50px', // large oval
                          padding: '15px 40px',
                          fontSize: '2rem', // big text
                          fontWeight: '900',
                          textTransform: 'uppercase',
                          boxShadow: snapshot.isDragging ? '0 15px 25px rgba(0,0,0,0.3)' : '0 8px 10px rgba(0,0,0,0.2)',
                          cursor: 'grab',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '15px',
                          transform: snapshot.isDragging ? `${provided.draggableProps.style.transform} scale(1.15)` : provided.draggableProps.style.transform,
                          zIndex: snapshot.isDragging ? 10 : 1
                        }}
                      >
                        <span style={{ fontSize: '2.5rem' }}>🐝</span> 
                        {item.word}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        {/* The Flowers Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '40px',
          justifyItems: 'center'
        }}>
          {flowers.map((f, i) => {
            const isMatched = matchedWords.includes(f.word);
            
            return (
              <Droppable key={i} droppableId={`flower-${i}`} isDropDisabled={isMatched}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      // Flower petals using a circular border approach
                      background: isMatched ? '#d4edda' : (snapshot.isDraggingOver ? '#ffe8e8' : '#fff'),
                      border: `15px solid ${isMatched ? '#28a745' : '#ffb6c1'}`,
                      width: '300px',
                      height: '300px',
                      borderRadius: '50%', // Perfect circle
                      boxShadow: 'var(--shadow-lg)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '30px',
                      transition: 'all 0.3s ease',
                      position: 'relative'
                    }}
                  >
                    {!isMatched ? (
                      <>
                        <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🌸</div>
                        <p style={{ margin: 0, fontSize: '1.4rem', fontWeight: 'bold' }}>
                          {f.description}
                        </p>
                      </>
                    ) : (
                      <div style={{
                        background: '#FFD700',
                        border: '5px solid #333',
                        color: '#333',
                        borderRadius: '50px',
                        padding: '15px 30px',
                        fontSize: '2rem',
                        fontWeight: '900',
                        textTransform: 'uppercase',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px',
                        boxShadow: '0 5px 8px rgba(0,0,0,0.1)'
                      }}>
                        <span style={{ fontSize: '2.5rem' }}>🐝</span> 
                        {f.word}
                      </div>
                    )}
                    
                    <div style={{ display: 'none' }}>{provided.placeholder}</div>
                  </div>
                )}
              </Droppable>
            )
          })}
        </div>
        
      </DragDropContext>

    </div>
  );
};

export default BeeFlowerGame;
