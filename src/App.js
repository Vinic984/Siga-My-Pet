import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import PetMap from './components/PetMap';
import DirectMap from './components/DirectMap';
import QuickAccess from './components/QuickAccess';
import ModernLogin from './components/ModernLogin';
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={<Navigate to="/modern" replace />}
          />
          <Route 
            path="/modern" 
            element={<ModernLogin />} 
          />
          <Route 
            path="/login" 
            element={
              isAuthenticated ? 
              <Navigate to="/map" replace /> : 
              <Login onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/map" 
            element={
              isAuthenticated ? 
              <PetMap user={user} onLogout={handleLogout} /> : 
              <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/direct/:collarNumber" 
            element={<DirectMap />} 
          />
          <Route 
            path="/quick" 
            element={<QuickAccess />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
