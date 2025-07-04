import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/main.css';
import loginImage from '../assets/img.jpg';

const Login = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [otp, setOtp] = useState('');

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/check-session', {
          withCredentials: true,
        });

        if (res.data.loggedIn) {
          window.location.href = '/dashboard';
        }
      } catch (error) {
        console.error('Session check failed:', error);
      }
    };

    checkSession();
  }, []);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/auth/send-otp',
        { email },
        { withCredentials: true }
      );
      setStep(2);
    } catch (err) {
      alert('Failed to send OTP');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/verify-otp',
        { email, otp, name, dob },
        { withCredentials: true }
      );
      if (res.status === 200) {
        window.location.href = '/dashboard';
      }
    } catch (err) {
      alert('OTP verification failed');
    }
  };

  return (
    <div className="login-page">
      <div className="login-form-side">
        <div className="login-content">
          <h1>{step === 1 ? 'Sign up' : 'Verify OTP'}</h1>
          <p>Sign up to enjoy the feature of HD</p>

          <form onSubmit={step === 1 ? handleSendOtp : handleVerifyOtp}>
            {step === 1 && (
              <>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                />
              </>
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {step === 2 && (
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            )}

            <button type="submit">{step === 1 ? 'Get OTP' : 'Verify OTP'}</button>
          </form>

          <div className="login-footer">
            {step === 1 ? (
              <p>
                Already have an account? <a href="/login">Sign in</a>
              </p>
            ) : (
              <p>
                <a href="#" onClick={() => setStep(1)}>
                  ← Back to Sign Up
                </a>
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="login-image-side">
        <img src={loginImage} alt="Login Visual" />
      </div>
    </div>
  );
};

export default Login;
