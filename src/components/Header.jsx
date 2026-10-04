import React, { useState } from 'react';
import { QrCode, X } from 'lucide-react';

export default function Header({ currentView, onNavigate }) {
  const [authModal, setAuthModal] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setAuthModal(null);
      setEmail('');
      setPassword('');
    }, 1500);
  };

  return (
    <>
      <header className="app-header">
        <div
          className="logo-container clickable"
          onClick={() => onNavigate && onNavigate('landing')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onNavigate && onNavigate('landing');
          }}
        >
          <div className="logo-icon-wrapper">
            <QrCode size={22} className="logo-icon" />
          </div>
          <h1 className="logo-title">Qvo</h1>
        </div>

        <div className="header-actions">
          {currentView === 'landing' ? (
            <button
              type="button"
              className="btn-nav-link"
              onClick={() => onNavigate('editor')}
            >
              Generator
            </button>
          ) : (
            <button
              type="button"
              className="btn-nav-link"
              onClick={() => onNavigate('landing')}
            >
              Home
            </button>
          )}

          <button
            type="button"
            className="btn-nav-login"
            onClick={() => setAuthModal('login')}
          >
            Log In
          </button>
          <button
            type="button"
            className="btn-nav-signup"
            onClick={() => setAuthModal('signup')}
          >
            Sign Up
          </button>
        </div>
      </header>

      {authModal && (
        <div className="modal-backdrop" onClick={() => setAuthModal(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">
                {authModal === 'login' ? 'Welcome Back' : 'Create an Account'}
              </h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setAuthModal(null)}
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>

            {submitted ? (
              <div className="modal-success">
                <p>✓ Successfully {authModal === 'login' ? 'logged in' : 'registered'} (demo mode)!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="modal-form">
                <div className="field-group">
                  <label className="field-label">Email</label>
                  <input
                    type="email"
                    required
                    className="text-input"
                    placeholder="student@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                  />
                </div>

                <div className="field-group">
                  <label className="field-label">Password</label>
                  <input
                    type="password"
                    required
                    className="text-input"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-primary modal-submit-btn">
                  {authModal === 'login' ? 'Log In' : 'Sign Up'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
