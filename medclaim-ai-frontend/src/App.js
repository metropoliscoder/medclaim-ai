import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Claims from './pages/Claims';
import AIAssistant from './pages/AIAssistant';
import Analytics from './pages/Analytics';
import Sidebar from './components/Sidebar';
import './App.css';

function AppShell() {
  const { user } = useAuth();
  const [active, setActive] = useState('dashboard');

  if (!user) {
    return (
      <AnimatePresence mode="wait">
        <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <Login />
        </motion.div>
      </AnimatePresence>
    );
  }

  const pages = {
    dashboard: <Dashboard setActive={setActive} />,
    claims: <Claims />,
    assistant: <AIAssistant />,
    analytics: <Analytics />,
    settings: <SettingsPlaceholder />,
  };

  return (
    <motion.div
      className="app-shell"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Sidebar active={active} setActive={setActive} />
      <main className={`app-main ${active === 'assistant' ? 'app-main--full' : ''}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            style={{ height: active === 'assistant' ? '100%' : 'auto' }}
          >
            {pages[active]}
          </motion.div>
        </AnimatePresence>
      </main>
    </motion.div>
  );
}

function SettingsPlaceholder() {
  return (
    <div style={{ padding: '28px 32px' }}>
      <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 24, marginBottom: 8 }}>Settings</h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Configuration options coming soon.</p>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  );
}
