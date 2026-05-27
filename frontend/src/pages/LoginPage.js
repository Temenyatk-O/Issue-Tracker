import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiLogin } from '../api/client';
import '../styles/Auth.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm]     = useState({ email: '', password: '' });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      setError('Please enter your email and password.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const { data } = await apiLogin(form);
      // Persist auth state — see api/client.js interceptors for usage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/');   // redirect to dashboard
    } catch (err) {
      const data = err.response?.data;
      setError(
        data?.message ||
        data?.errors?.[0]?.msg ||
        'Login failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Left brand panel */}
      <div className="auth-brand">
        <div className="auth-brand-logo">IssueTracker</div>
        <div className="auth-brand-copy">
          <h1>Track issues.<br />Ship faster.</h1>
          <p>A lightweight, focused issue tracker for teams who value clarity over complexity.</p>
        </div>
        <div className="auth-brand-footer">© {new Date().getFullYear()} IssueTracker</div>
      </div>

      {/* Right form panel */}
      <div className="auth-form-panel">
        <div className="auth-form-inner">
          <h2>Welcome back</h2>
          <p>Don't have an account? <Link to="/register">Sign up free</Link></p>

          {error && <div className="auth-error">{error}</div>}

          <div className="field">
            <label>Email</label>
            <input type="email" autoComplete="email" placeholder="example@ex.com"
              value={form.email} onChange={(e) => set('email', e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()} />
          </div>

          <div className="field">
            <label>Password</label>
            <input type="password" autoComplete="current-password" placeholder="••••••••"
              value={form.password} onChange={(e) => set('password', e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()} />
          </div>

          <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
