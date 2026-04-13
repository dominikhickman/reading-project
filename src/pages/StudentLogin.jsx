import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { supabase } from '../supabaseClient';
import Card from '../components/Card';

const StudentLogin = () => {
  const [step, setStep] = useState(1);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const { loginStudent } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeachers = async () => {
      const { data, error } = await supabase.from('teachers').select('*');
      if (error) {
        console.error('Failed to fetch teachers:', error);
      } else if (data) {
        setTeachers(data);
      }
    };
    fetchTeachers();
  }, []);

  const handleTeacherSelect = async (teacher) => {
    setSelectedTeacher(teacher);
    const { data } = await supabase.from('students').select('*').eq('teacher_id', teacher.id);
    if (data) setStudents(data);
    setStep(2);
  };

  const handleStudentSelect = async (student) => {
    await loginStudent(student.id);
    navigate('/student/dashboard');
  };

  return (
    <div className="container flex-center" style={{ minHeight: '80vh', flexDirection: 'column' }}>
      
      {step === 1 && (
        <>
          <h1 style={{ marginBottom: '40px' }}>Who is your Teacher?</h1>
          <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {teachers.map(t => (
              <Card 
                key={t.id} 
                onClick={() => handleTeacherSelect(t)}
                style={{ width: '250px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <div style={{ fontSize: '5rem', marginBottom: '10px' }}>🍎</div>
                <h2 style={{ color: 'var(--primary-color)' }}>{t.name}</h2>
              </Card>
            ))}
            {teachers.length === 0 && <p>No teachers have been added to the database yet.</p>}
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <h1 style={{ marginBottom: '20px' }}>Find Your Name!</h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>Class: {selectedTeacher?.name}</p>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '800px' }}>
            {students.map(s => (
              <div 
                key={s.id}
                onClick={() => handleStudentSelect(s)}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '20px',
                  width: '150px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-sm)',
                  border: '3px solid transparent',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--secondary-color)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}
              >
                <div style={{ fontSize: '3rem', marginBottom: '10px' }}>👧👦</div>
                <h3 style={{ margin: 0 }}>{s.name}</h3>
              </div>
            ))}
            {students.length === 0 && <p>No students found for this class.</p>}
          </div>
          <button 
            onClick={() => setStep(1)}
            style={{ marginTop: '40px', background: 'white', color: 'var(--text-main)', border: 'none', padding: '10px 20px', fontSize: '1.2rem', cursor: 'pointer', borderRadius: '8px' }}
          >
            ← Back
          </button>
        </>
      )}

    </div>
  );
};

export default StudentLogin;
