import React from 'react';
import { motion } from 'framer-motion';
import { Shield, LayoutDashboard, FileText, Brain, BarChart2, Settings, LogOut, Bell, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const NAV = [
  { icon: <LayoutDashboard size={18} />, label: 'Dashboard', id: 'dashboard' },
  { icon: <Shield size={18} />, label: "New Claim Review", id: "claim-review" },
  { icon: <FileText size={18} />, label: 'Claims', id: 'claims', badge: 47 },
  { icon: <Brain size={18} />, label: 'AI Assistant', id: 'assistant' },
  { icon: <BarChart2 size={18} />, label: 'Analytics', id: 'analytics' },
  { icon: <Settings size={18} />, label: 'Settings', id: 'settings' },
];

export default function Sidebar({ active, setActive }) {
  const { user, logout } = useAuth();

  return (
    <motion.aside
      className="sidebar"
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Logo */}
      <div className="sidebar-logo">
        <motion.div
          className="logo-icon"
          animate={{ boxShadow: ['0 0 12px rgba(59,130,246,0.3)', '0 0 30px rgba(59,130,246,0.6)', '0 0 12px rgba(59,130,246,0.3)'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Shield size={22} color="#3b82f6" strokeWidth={1.5} />
        </motion.div>
        <div className="logo-text">
          {/* <span className="logo-name">MedClaim </span> */}
          
              <span className="logo-name text-white">MedClaim <span className="brand-ai">AI</span></span>
            
          <span className="logo-version">v2.4.1</span>
        </div>
      </div>

      {/* User card */}
      <div className="sidebar-user">
        <div className="user-avatar">{user?.avatar}</div>
        <div className="user-info">
          <span className="user-name">{user?.name}</span>
          <span className="user-role">{user?.role}</span>
        </div>
        <button className="notif-btn">
          <Bell size={15} />
          <span className="notif-dot" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="nav-section-label">Main Menu</div>
        {NAV.map((item, i) => (
          <motion.button
            key={item.id}
            className={`nav-item ${active === item.id ? 'nav-item--active' : ''}`}
            onClick={() => setActive(item.id)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.07 }}
            whileHover={{ x: 4 }}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
            {item.badge && <span className="nav-badge">{item.badge}</span>}
            {active === item.id && (
              <motion.div className="nav-active-line" layoutId="activeNav" />
            )}
          </motion.button>
        ))}
      </nav>

      {/* AI Status */}
      <div className="sidebar-ai-status">
        <div className="ai-status-header">
          <Brain size={14} color="#8b5cf6" />
          <span>AI Engine</span>
        </div>
        <div className="ai-pulse-bars">
          {Array.from({ length: 16 }, (_, i) => (
            <motion.div
              key={i}
              className="ai-bar"
              animate={{ height: [3, Math.random() * 20 + 3, 3] }}
              transition={{ duration: 0.6 + Math.random() * 0.6, repeat: Infinity, delay: i * 0.04 }}
            />
          ))}
        </div>
        <div className="ai-accuracy">Accuracy: 97.3%</div>
      </div>

      {/* Logout */}
      <button className="sidebar-logout" onClick={logout}>
        <LogOut size={16} />
        <span>Sign Out</span>
      </button>
    </motion.aside>
  );
}
