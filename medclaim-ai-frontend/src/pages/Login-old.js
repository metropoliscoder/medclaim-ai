import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Eye, EyeOff, Zap, Activity } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 8 + 4,
  delay: Math.random() * 4,
}));

const GRID_LINES = Array.from({ length: 12 }, (_, i) => i);

export default function Login() {
  const { login, error, setError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scanLine, setScanLine] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setScanLine(p => (p + 1) % 100), 50);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    login(email, password);
    setLoading(false);
  };

  return (
    <div className="login-root">
      {/* Animated grid background */}
      <div className="login-grid">
        {GRID_LINES.map(i => (
          <div key={`h${i}`} className="grid-line-h" style={{ top: `${(i / 12) * 100}%` }} />
        ))}
        {GRID_LINES.map(i => (
          <div key={`v${i}`} className="grid-line-v" style={{ left: `${(i / 12) * 100}%` }} />
        ))}
      </div>

      {/* Floating particles */}
      {PARTICLES.map(p => (
        <motion.div
          key={p.id}
          className="particle"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -40, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <div className="login-center">
        {/* Left panel - branding */}
        <motion.div
          className="login-brand"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            className="brand-icon-wrap"
            animate={{ boxShadow: ['0 0 20px rgba(59,130,246,0.3)', '0 0 60px rgba(59,130,246,0.6)', '0 0 20px rgba(59,130,246,0.3)'] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <Shield size={38} color="#3b82f6" strokeWidth={1.5} />
          </motion.div>

          <div className="brand-title">
            <span className="brand-name">ClaimIQ</span>
            <span className="brand-sub">AI-Powered Insurance Intelligence</span>
          </div>

          <div className="brand-features">
            {[
              { icon: <Zap size={16} />, text: 'Real-time AI claim analysis' },
              { icon: <Shield size={16} />, text: 'Fraud detection & risk scoring' },
              { icon: <Activity size={16} />, text: 'Intelligent decision support' },
            ].map((f, i) => (
              <motion.div
                key={i}
                className="brand-feature"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.15 }}
              >
                <span className="feature-icon">{f.icon}</span>
                <span>{f.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Scanning animation */}
          <div className="scan-box">
            <div className="scan-label">AI Engine Status</div>
            <div className="scan-bars">
              {Array.from({ length: 20 }, (_, i) => (
                <motion.div
                  key={i}
                  className="scan-bar"
                  animate={{ height: [4, Math.random() * 28 + 4, 4] }}
                  transition={{ duration: 0.8 + Math.random(), repeat: Infinity, delay: i * 0.05 }}
                />
              ))}
            </div>
            <div className="scan-status">
              <span className="status-dot" />
              <span>All systems operational</span>
            </div>
          </div>
        </motion.div>

        {/* Right panel - login form */}
        <motion.div
          className="login-card"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="card-glow" />

          <div className="card-header">
            <h2>Secure Access</h2>
            <p>Sign in to your ClaimIQ workspace</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrap">
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(''); }}
                  placeholder="you@healthplan.com"
                  required
                  autoComplete="email"
                />
                <div className="input-line" />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-wrap">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  placeholder="••••••••"
                  required
                />
                <button type="button" className="eye-btn" onClick={() => setShowPass(p => !p)}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <div className="input-line" />
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  className="error-msg"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              className="login-btn"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? (
                <div className="btn-loading">
                  <div className="spinner" />
                  <span>Authenticating...</span>
                </div>
              ) : (
                <span>Sign In Securely</span>
              )}
              <div className="btn-shimmer" />
            </motion.button>

            <div className="demo-hint">
              <span>Demo:</span> alex.morgan@healthplan.com / demo123
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
