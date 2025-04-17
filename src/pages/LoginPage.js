// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

import logo from '../images/logo.png';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');

  

  const navigate=useNavigate();

//to handle login page submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      localStorage.setItem('userEmail', email);
      onLogin(email);
      navigate('/home');
    }
  };
//

  
return (
  <div className="container" class='body-for-login'>
    <div className="log-box row">
      <div className="col-md-6 d-flex align-items-center justify-content-center">
        <div className="loginpage">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
            />
            <button type="submit" class='btn-for-login'>Login</button>
          </form>
          <div className="terms-and-services">
            <p>
              <a href="/login">Terms of Service | Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-6 d-flex align-items-center justify-content-center">
        <img src={logo} alt="Logo" className="login-logo" />
      </div>
    </div>
  </div>
    );
  };

export default LoginPage;