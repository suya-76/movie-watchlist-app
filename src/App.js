// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SearchPage from './pages/SearchPage';
import WatchlistPage from './pages/WatchlistPage';

import HomePage from './pages/HomePage';

const App = () => {
  const [userEmail, setUserEmail] = useState(null);

  
  const AuthenticatedRoutes = () => {
    const navigate = useNavigate(); 

//to handle logout
    const handleLogout = () => {
      localStorage.removeItem('userEmail');
      localStorage.removeItem('watchlist');
      setUserEmail(null);
      navigate('/login'); 
    };
//

    return (
      <>
        
        <Routes>
          <Route path="/search" element={<SearchPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
          <Route path="/" element={<Navigate to="/LoginPage" />} />
        </Routes>
        <div className="logout-button-container" >
          <p className='logout-text'>Click here to logout</p> 
        <button onClick={handleLogout}>Logout</button>
        </div>
      </>
    );
  };

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      setUserEmail(email);
    }
  }, []);

  return (
    <Router>
      <div>
        {userEmail ? (
          <AuthenticatedRoutes/> 
        ) : (
          <Routes>
            <Route path="/login" element={<LoginPage onLogin={setUserEmail} />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;
