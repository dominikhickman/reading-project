import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { MONSTERS } from '../utils/monsters';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [role, setRole] = useState(null); // 'teacher', 'student'
  const [currentUser, setCurrentUser] = useState(null);
  
  const [points, setPoints] = useState(0);
  const [monster, setMonster] = useState(null);
  const [stickers, setStickers] = useState([]);
  const [classData, setClassData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Listen to Supabase Auth for Teacher login
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setRole('teacher');
        setCurrentUser({ email: session.user.email, id: session.user.id, type: 'teacher' });
        fetchClassData(session.user.id);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setRole('teacher');
        setCurrentUser({ email: session.user.email, id: session.user.id, type: 'teacher' });
        fetchClassData(session.user.id);
      } else {
        if (role === 'teacher') {
          setRole(null);
          setCurrentUser(null);
          setClassData([]);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchClassData = async (teacherId) => {
    const { data } = await supabase
      .from('students')
      .select('*')
      .eq('teacher_id', teacherId);
    if (data) setClassData(data);
  };

  const loginStudent = async (studentId) => {
    const { data, error } = await supabase.from('students').select('*').eq('id', studentId).single();
    if (data && !error) {
      setRole('student');
      setCurrentUser({ ...data, type: 'student' });
      setPoints(data.points || 0);
      const fullMonsterDef = data.monster_type ? MONSTERS.find(m => m.id === data.monster_type) : null;
      setMonster(fullMonsterDef ? { ...fullMonsterDef, level: data.monster_level || 1 } : null);
      
      const { data: stickerData } = await supabase.from('student_stickers').select('*').eq('student_id', studentId);
      if (stickerData) setStickers(stickerData);
    }
  };

  const logout = async () => {
    if (role === 'teacher') {
      await supabase.auth.signOut();
    }
    setRole(null);
    setCurrentUser(null);
  };

  const addPoints = async (amount) => {
    const newPoints = points + amount;
    setPoints(newPoints);
    if (role === 'student' && currentUser?.id) {
      await supabase.from('students').update({ points: newPoints }).eq('id', currentUser.id);
    }
  };
  
  const updateMonster = async (newMonster) => {
    setMonster(newMonster);
    if (role === 'student' && currentUser?.id) {
      await supabase.from('students').update({ 
        monster_type: newMonster.id, 
        monster_level: newMonster.level || 1
      }).eq('id', currentUser.id);
    }
  };

  const updateStudentDifficulty = async (studentId, difficulty) => {
    await supabase.from('students').update({ difficulty }).eq('id', studentId);
    if (currentUser?.id) {
      fetchClassData(currentUser.id); // Refresh teacher's class data
    }
  };

  const addStudent = async (name) => {
    if (role !== 'teacher' || !currentUser?.id) return;
    
    // We provide a generated UUID for the student since the table might not auto-generate it depending on schema defaults. 
    // Supabase JS will auto-gen if we omit it and table has `default uuid_generate_v4()`. We'll rely on DB defaults if possible.
    const { data, error } = await supabase.from('students').insert([
      { name, teacher_id: currentUser.id, points: 0, reading_time_minutes: 0, success_rate_percent: 0, difficulty: 'Medium' }
    ]).select();
    
    if (error) {
      console.error('Failed to add student:', error);
      alert('Failed to add student. Please check your permissions.');
    } else if (data) {
      fetchClassData(currentUser.id);
    }
  };

  const value = {
    role,
    currentUser,
    points,
    monster,
    stickers,
    classData,
    loginStudent,
    logout,
    addPoints,
    setMonster: updateMonster,
    updateStudentDifficulty,
    addStudent,
    setStickers,
    loading
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
