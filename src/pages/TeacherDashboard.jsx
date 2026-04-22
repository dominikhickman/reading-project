import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import Card from '../components/Card';
import Button from '../components/Button';

const TeacherDashboard = () => {
  const { classData, updateStudentDifficulty, addStudent } = useAppContext();
  const [newStudentName, setNewStudentName] = useState('');

  const handleAddStudent = async (e) => {
    e.preventDefault();
    const trimmedName = newStudentName.trim();
    if (!trimmedName) return;
    const added = await addStudent(trimmedName);
    if (added) {
      setNewStudentName('');
    }
  };

  return (
    <div className="container" style={{ padding: '20px 0' }}>
      <h1 style={{ marginBottom: '30px' }}>Teacher Dashboard</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <Card className="text-center" style={{ background: 'var(--primary-color)', color: 'white' }}>
          <h3>Total Students</h3>
          <h2>{classData.length}</h2>
        </Card>
        <Card className="text-center" style={{ background: 'var(--secondary-color)', color: 'white' }}>
          <h3>Class Average Success</h3>
          <h2>78%</h2>
        </Card>
        <Card className="text-center" style={{ background: 'var(--accent-color)', color: 'white' }}>
          <h3>Total Reading Time</h3>
          <h2>24h 50m</h2>
        </Card>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>Student Progress</h2>
        
        <form onSubmit={handleAddStudent} style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="New Student Name" 
            value={newStudentName}
            onChange={(e) => setNewStudentName(e.target.value)}
            style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem', outline: 'none' }}
          />
          <Button type="submit" size="sm">Add Student</Button>
        </form>
      </div>

      <Card style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #EEE' }}>
              <th style={{ padding: '15px 10px' }}>Name</th>
              <th style={{ padding: '15px 10px' }}>Points</th>
              <th style={{ padding: '15px 10px' }}>Reading Time</th>
              <th style={{ padding: '15px 10px' }}>Success Rate</th>
              <th style={{ padding: '15px 10px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {classData.map(student => (
              <tr key={student.id} style={{ borderBottom: '1px solid #EEE' }}>
                <td style={{ padding: '15px 10px', fontWeight: 'bold' }}>{student.name}</td>
                <td style={{ padding: '15px 10px' }}>⭐ {student.points}</td>
                <td style={{ padding: '15px 10px' }}>{Math.floor((student.reading_time_minutes || 0) / 60)}h {(student.reading_time_minutes || 0) % 60}m</td>
                <td style={{ padding: '15px 10px' }}>
                  <span style={{ 
                    color: (student.success_rate_percent || 0) > 80 ? 'green' : 'var(--text-main)',
                    fontWeight: 'bold'
                  }}>
                    {student.success_rate_percent || 0}%
                  </span>
                </td>
                <td style={{ padding: '15px 10px' }}>
                  <select 
                    value={student.difficulty || 'Medium'} 
                    onChange={(e) => updateStudentDifficulty(student.id, e.target.value)}
                    style={{ padding: '8px', borderRadius: '8px', border: '1px solid #ccc', cursor: 'pointer', outline: 'none' }}
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default TeacherDashboard;
