import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../supabaseClient';

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
    // Wait for the teacher to exist or just fetch all students for now if no specific teacher RLS
    const { data } = await supabase
      .from('students')
      .select('*');
    if (data) setClassData(data);
  };

  const loginStudent = async (studentId) => {
    const { data, error } = await supabase.from('students').select('*').eq('id', studentId).single();
    if (data && !error) {
      setRole('student');
      setCurrentUser({ ...data, type: 'student' });
      setPoints(data.points || 0);
      setMonster(data.monster_type ? { type: data.monster_type, level: data.monster_level } : null);
      
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
        monster_type: newMonster.type, 
        monster_level: newMonster.level 
      }).eq('id', currentUser.id);
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
    setStickers,
    loading
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
