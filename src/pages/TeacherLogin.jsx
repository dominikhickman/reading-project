import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Card from '../components/Card';
import Button from '../components/Button';

const TeacherLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) return;

    if (isSignUp) {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) setError(error.message);
      else {
        alert('Signup successful! Check your email to confirm, or login if you disabled email confirmations.');
        setIsSignUp(false);
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
      else navigate('/teacher/dashboard');
    }
  };

  return (
    <div className="container flex-center" style={{ minHeight: '80vh' }}>
      <Card style={{ width: '400px', padding: '40px' }}>
        <h2 className="text-center" style={{ color: 'var(--primary-color)' }}>
          {isSignUp ? 'Teacher Sign Up' : 'Teacher Login'}
        </h2>
        <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '30px' }}>
          <div>
            <label style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. ms.frizzle@school.edu"
              required
              style={{
                width: '100%', padding: '12px', borderRadius: '8px', 
                border: '2px solid #ccc', fontSize: '1rem', outline: 'none'
              }}
            />
          </div>
          <div>
            <label style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              style={{
                width: '100%', padding: '12px', borderRadius: '8px', 
                border: '2px solid #ccc', fontSize: '1rem', outline: 'none'
              }}
            />
          </div>
          {error && <p style={{ color: 'red', margin: '0' }}>{error}</p>}
          <Button type="submit" style={{ marginTop: '10px' }} size="lg">
            {isSignUp ? 'Create Account' : 'Log In'}
          </Button>
        </form>
        
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button 
            type="button" 
            onClick={() => setIsSignUp(!isSignUp)}
            style={{ 
              background: 'none', border: 'none', color: 'var(--primary-color)', 
              cursor: 'pointer', textDecoration: 'underline'
            }}
          >
            {isSignUp ? 'Already have an account? Log In' : 'Need an account? Sign Up'}
          </button>
        </div>
      </Card>
    </div>
  );
};

export default TeacherLogin;
