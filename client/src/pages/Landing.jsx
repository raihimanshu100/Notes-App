import React from 'react';
import '../styles/main.css';
import { useNavigate } from 'react-router-dom';
import LogoHeader from '../components/LogoHeader';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-box">
        <LogoHeader align="center" />

        <h1>Welcome to Notes</h1>
        <p>Login to manage your notes securely</p>

        <div className="auth-buttons">
          <button
            className="google-btn"
            onClick={() =>
              (window.location.href = 'http://localhost:5000/api/auth/google')
            }
          >
            Sign in with Google
          </button>

          <button className="email-btn" onClick={() => navigate('/login')}>
            Sign in with Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
