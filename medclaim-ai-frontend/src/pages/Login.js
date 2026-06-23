import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, Brain, Shield, Zap, CheckCircle, FileText, Activity, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Login.css';

/* ── Floating feature card ── */
function FeatureCard({ icon, title, subtitle, style, delay }) {
  return (
    <motion.div
      className="fc"
      style={style}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
    >
      <div className="fc-icon">{icon}</div>
      <div className="fc-text">
        <span className="fc-title">{title}</span>
        {subtitle && <span className="fc-sub">{subtitle}</span>}
      </div>
    </motion.div>
  );
}

/* ── Orbiting ring (pure CSS/SVG via motion) ── */
function OrbitRing({ radius, duration, reverse, dotColor }) {
  return (
    <motion.div
      className="orbit-ring"
      style={{ width: radius * 2, height: radius * 2, borderRadius: '50%' }}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      <div className="orbit-dot" style={{ background: dotColor }} />
    </motion.div>
  );
}

export default function Login() {
  const { login, error, setError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [particles, setParticles] = useState([]);

  /* generate star particles once */
  useEffect(() => {
    setParticles(
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 0.5,
        dur: Math.random() * 6 + 3,
        delay: Math.random() * 4,
      }))
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    login(email, password);
    setLoading(false);
  };

  return (
    <div className="lp-root">
      {/* Star field */}
      <div className="lp-stars">
        {particles.map(p => (
          <motion.div
            key={p.id}
            className="lp-star"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
            animate={{ opacity: [0.15, 0.9, 0.15] }}
            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Purple nebula blobs */}
      <div className="lp-blob lp-blob--1" />
      <div className="lp-blob lp-blob--2" />
      <div className="lp-blob lp-blob--3" />

      {/* ── Layout ── */}
      <div className="lp-layout">

        {/* ═══ LEFT PANEL ═══ */}
        <div className="lp-left">
          {/* Brand */}
          <motion.div
            className="lp-brand"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="lp-brand-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="url(#cg1)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="cg1" x1="0" y1="0" x2="24" y2="0">
                    <stop stopColor="#06b6d4"/><stop offset="1" stopColor="#8b5cf6"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div>
              <span className="lp-brand-name">MedClaim <span className="brand-ai">AI</span></span>
              <span className="lp-brand-tagline">Healthcare Insurance Claim<br/>Review Assistant</span>
            </div>
          </motion.div>

          {/* Shield hero */}
          <div className="lp-hero">
            {/* Orbit rings */}
            <div className="orbits-wrap">
              <OrbitRing radius={130} duration={9}  reverse={false} dotColor="#06b6d4" />
              <OrbitRing radius={100} duration={6}  reverse={true}  dotColor="#8b5cf6" />
              <OrbitRing radius={70}  duration={4}  reverse={false} dotColor="#06b6d4" />
            </div>

            {/* Platform glow rings */}
            <div className="platform">
              <div className="plat-ring plat-ring--1" />
              <div className="plat-ring plat-ring--2" />
              <div className="plat-ring plat-ring--3" />
            </div>

            {/* Shield */}
            <motion.div
              className="shield-wrap"
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="shield-glow" />
              <svg className="shield-svg" viewBox="0 0 120 140" fill="none">
                <defs>
                  <linearGradient id="sg" x1="0" y1="0" x2="120" y2="140" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#06b6d4" stopOpacity="0.9"/>
                    <stop offset="1" stopColor="#3b82f6" stopOpacity="0.7"/>
                  </linearGradient>
                  <filter id="glow-filter">
                    <feGaussianBlur stdDeviation="4" result="blur"/>
                    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                </defs>
                {/* Shield body */}
                <path
                  d="M60 8 L104 26 L104 70 C104 95 84 116 60 126 C36 116 16 95 16 70 L16 26 Z"
                  stroke="url(#sg)" strokeWidth="2.5" fill="rgba(6,182,212,0.06)" filter="url(#glow-filter)"
                />
                {/* Inner shield */}
                <path
                  d="M60 20 L94 34 L94 68 C94 88 78 106 60 114 C42 106 26 88 26 68 L26 34 Z"
                  stroke="rgba(6,182,212,0.3)" strokeWidth="1" fill="rgba(6,182,212,0.03)"
                />
                {/* Cross */}
                <rect x="52" y="48" width="16" height="44" rx="4" fill="url(#sg)" opacity="0.9"/>
                <rect x="38" y="62" width="44" height="16" rx="4" fill="url(#sg)" opacity="0.9"/>
              </svg>
            </motion.div>

            {/* Floating feature cards */}
            <FeatureCard
              icon={<User size={14} color="#06b6d4"/>}
              title="Patient" subtitle="Information"
              style={{ position:'absolute', left: '-60px', top: '20px' }}
              delay={0.7}
            />
            <FeatureCard
              icon={<FileText size={14} color="#8b5cf6"/>}
              title="Claim" subtitle="Documents"
              style={{ position:'absolute', right: '-60px', top: '10px' }}
              delay={0.85}
            />
            <FeatureCard
              icon={<Activity size={14} color="#06b6d4"/>}
              title="Patient" subtitle="Information"
              style={{ position:'absolute', left: '-70px', top: '120px' }}
              delay={1.0}
            />
            <FeatureCard
              icon={<CheckCircle size={14} color="#8b5cf6"/>}
              title="Policy" subtitle="Verification"
              style={{ position:'absolute', right: '-68px', top: '120px' }}
              delay={1.1}
            />
          </div>

          {/* Bottom feature strip */}
          <motion.div
            className="lp-features"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            {[
              { icon: <Brain size={18}/>, label: 'AI Powered', sub: 'Automation' },
              { icon: <Shield size={18}/>, label: 'Secure &', sub: 'Compliant' },
              { icon: <Zap size={18}/>, label: 'Faster', sub: 'Decisions' },
            ].map((f, i) => (
              <div key={i} className="lp-feat">
                <span className="lp-feat-icon">{f.icon}</span>
                <span className="lp-feat-text"><b>{f.label}</b><br/>{f.sub}</span>
                {i < 2 && <span className="lp-feat-sep">·</span>}
              </div>
            ))}
          </motion.div>
        </div>

        {/* ═══ RIGHT PANEL — FORM ═══ */}
        <motion.div
          className="lp-card"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* top edge glow */}
          <div className="lp-card-topglow" />

          <div className="lp-card-header">
            <h2>Welcome <span className="gradient-text">Back!</span></h2>
            <p>Sign in to continue to MedClaim AI</p>
          </div>

          <form onSubmit={handleSubmit} className="lp-form">
            {/* Email */}
            <div className="lp-field">
              <div className="lp-input-wrap">
                <Mail size={16} className="lp-input-icon" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(''); }}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="lp-field">
              <div className="lp-input-wrap">
                <Lock size={16} className="lp-input-icon" />
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  required
                />
                <button type="button" className="lp-eye" onClick={() => setShowPass(p => !p)}>
                  {showPass ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
              </div>
            </div>

            {/* Remember + forgot */}
            <div className="lp-row">
              <label className="lp-remember">
                <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
                <span className="lp-checkbox" />
                <span>Remember Me</span>
              </label>
              <button type="button" className="lp-forgot">Forgot Password?</button>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  className="lp-error"
                  initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Sign In button */}
            <motion.button
              type="submit"
              className="lp-signin-btn"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.97 }}
            >
              {loading ? (
                <span className="lp-btn-loading">
                  <span className="lp-spinner" />
                  Authenticating…
                </span>
              ) : 'Sign In'}
              <div className="lp-btn-shine" />
            </motion.button>

            {/* Divider */}
            <div className="lp-divider"><span>or</span></div>

            {/* Google button */}
            <button type="button" className="lp-google-btn">
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
                <path d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
              Sign in with Google
            </button>

            <div className="lp-powered">
              Powered by <span className="gradient-text">Multi-Agent AI</span>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Demo credentials bar */}
      <motion.div
        className="lp-demo"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
      >
        <div className="lp-demo-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <span className="lp-demo-label">Demo Credentials</span>
        <span className="lp-demo-sep">Email:</span>
        <span className="lp-demo-val" onClick={() => setEmail('saurabhchobeyss@gmail.com')} style={{cursor:'pointer'}}>
          saurabhchobeyss@gmail.com
        </span>
        <span className="lp-demo-sep">Password:</span>
        <span className="lp-demo-val" onClick={() => setPassword('demo123')} style={{cursor:'pointer'}}>
          demo123
        </span>
      </motion.div>
    </div>
  );
}
