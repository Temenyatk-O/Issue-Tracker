import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRegister } from '../api/client';
import '../styles/Auth.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm]     = useState({ name: '', email: '', password: '' });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password) {
      setError('All fields are required.');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const { data } = await apiRegister(form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/');
    } catch (err) {
      const data = err.response?.data;
      setError(
        data?.message ||
        data?.errors?.[0]?.msg ||
        'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-brand">
        <div className="auth-brand-logo">IssueTracker</div>
        <div className="auth-brand-copy">
          <h1>Get started<br />in seconds.</h1>
          <p>Create your account and start tracking issues for your team today.</p>
        </div>
        <div className="auth-brand-footer">© {new Date().getFullYear()} IssueTracker</div>
      </div>

      <div className="auth-form-panel">
        <div className="auth-form-inner">
          <h2>Create account</h2>
          <p>Already have an account? <Link to="/login">Sign in</Link></p>

          {error && <div className="auth-error">{error}</div>}

          <div className="field">
            <label>Full name</label>
            <input type="text" autoComplete="name" placeholder="Name"
              value={form.name} onChange={(e) => set('name', e.target.value)} />
          </div>

          <div className="field">
            <label>Email</label>
            <input type="email" autoComplete="email" placeholder="example@ex.com"
              value={form.email} onChange={(e) => set('email', e.target.value)} />
          </div>

          <div className="field">
            <label>Password <span style={{fontWeight:400, textTransform:'none', letterSpacing:0}}>(min. 6 characters)</span></label>
            <input type="password" autoComplete="new-password" placeholder="••••••••"
              value={form.password} onChange={(e) => set('password', e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()} />
          </div>

          <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
