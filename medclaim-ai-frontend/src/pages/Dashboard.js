import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
  TrendingUp, Clock, CheckCircle, AlertTriangle,
  DollarSign, Brain, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { STATS, MONTHLY_DATA, CLAIM_TYPES, CLAIMS } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const RISK_COLOR = { low: '#10b981', medium: '#f59e0b', high: '#f43f5e' };
const STATUS_COLOR = { 'Approved': '#10b981', 'Denied': '#f43f5e', 'Under Review': '#3b82f6', 'Pending Info': '#f59e0b' };

function StatCard({ icon, label, value, trend, color, delay }) {
  return (
    <motion.div
      className="stat-card"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      style={{ '--accent': color }}
    >
      <div className="stat-icon">{icon}</div>
      <div className="stat-body">
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
      </div>
      {trend && (
        <div className={`stat-trend ${trend.up ? 'trend-up' : 'trend-down'}`}>
          {trend.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          <span>{trend.value}</span>
        </div>
      )}
      <div className="stat-glow" />
    </motion.div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div className="tooltip-label">{label}</div>
      {payload.map((p, i) => (
        <div key={i} className="tooltip-row">
          <span style={{ color: p.color }}>{p.name}</span>
          <span>{p.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function Dashboard({ setActive }) {
  const { user } = useAuth();
  const recentClaims = CLAIMS.slice(0, 5);

  return (
    <div className="dashboard">
      {/* Header */}
      <motion.div
        className="dash-header"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1>Good morning, {user?.name.split(' ')[0]} 👋</h1>
          <p>Here's your claims intelligence overview for today</p>
        </div>
        <div className="dash-header-right">
          <div className="ai-badge">
            <Brain size={14} />
            <span>AI Active</span>
          </div>
          <div className="date-badge">
            {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </div>
        </div>
      </motion.div>

      {/* Stats grid */}
      <div className="stats-grid">
        <StatCard
          icon={<FileIcon />}
          label="Total Claims"
          value={STATS.totalClaims.toLocaleString()}
          trend={{ up: true, value: '+12% vs last month' }}
          color="#3b82f6"
          delay={0.1}
        />
        <StatCard
          icon={<Clock size={20} />}
          label="Pending Review"
          value={STATS.pendingReview}
          trend={{ up: false, value: '+8 today' }}
          color="#f59e0b"
          delay={0.15}
        />
        <StatCard
          icon={<CheckCircle size={20} />}
          label="Approved Today"
          value={STATS.approvedToday}
          trend={{ up: true, value: '96% accuracy' }}
          color="#10b981"
          delay={0.2}
        />
        <StatCard
          icon={<DollarSign size={20} />}
          label="Total Payout"
          value={STATS.totalPayout}
          trend={{ up: true, value: '+5.2% vs last month' }}
          color="#8b5cf6"
          delay={0.25}
        />
        <StatCard
          icon={<Brain size={20} />}
          label="AI Accuracy"
          value={STATS.aiAccuracy}
          trend={{ up: true, value: '+0.4% improvement' }}
          color="#06b6d4"
          delay={0.3}
        />
        <StatCard
          icon={<TrendingUp size={20} />}
          label="Avg Processing"
          value={STATS.avgProcessingTime}
          trend={{ up: true, value: 'Down from 3.2 days' }}
          color="#f43f5e"
          delay={0.35}
        />
      </div>

      {/* Charts row */}
      <div className="charts-row">
        {/* Area chart */}
        <motion.div
          className="chart-card chart-card--wide"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="chart-header">
            <div>
              <h3>Claims Volume Trend</h3>
              <p>Monthly approved, denied & pending</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={MONTHLY_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="gradApproved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradDenied" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#f43f5e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="approved" name="Approved" stroke="#10b981" fill="url(#gradApproved)" strokeWidth={2} dot={false} />
              <Area type="monotone" dataKey="denied" name="Denied" stroke="#f43f5e" fill="url(#gradDenied)" strokeWidth={2} dot={false} />
              <Area type="monotone" dataKey="pending" name="Pending" stroke="#f59e0b" fill="none" strokeWidth={2} strokeDasharray="4 4" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie chart */}
        <motion.div
          className="chart-card"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <div className="chart-header">
            <div>
              <h3>Claim Types</h3>
              <p>Distribution by category</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={CLAIM_TYPES} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                {CLAIM_TYPES.map((entry, i) => (
                  <Cell key={i} fill={entry.color} opacity={0.85} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} contentStyle={{ background: '#0d1225', border: '1px solid rgba(99,179,237,0.15)', borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="pie-legend">
            {CLAIM_TYPES.map((t, i) => (
              <div key={i} className="legend-item">
                <span className="legend-dot" style={{ background: t.color }} />
                <span className="legend-name">{t.name}</span>
                <span className="legend-val">{t.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent claims */}
      <motion.div
        className="recent-claims"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="section-header">
          <div>
            <h3>Recent Claims</h3>
            <p>Latest submissions requiring attention</p>
          </div>
          <button className="view-all-btn" onClick={() => setActive('claims')}>View All</button>
        </div>

        <div className="claims-table">
          <div className="table-head">
            <span>Claim ID</span>
            <span>Patient</span>
            <span>Type</span>
            <span>Amount</span>
            <span>AI Score</span>
            <span>Status</span>
            <span>Risk</span>
          </div>
          {recentClaims.map((claim, i) => (
            <motion.div
              key={claim.id}
              className="table-row"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55 + i * 0.06 }}
              whileHover={{ backgroundColor: 'rgba(59,130,246,0.04)' }}
            >
              <span className="claim-id">{claim.id}</span>
              <span>{claim.patient}</span>
              <span className="claim-type-badge">{claim.type}</span>
              <span className="claim-amount">${claim.amount.toLocaleString()}</span>
              <span>
                <div className="ai-score-mini">
                  <div className="ai-score-bar" style={{ width: `${claim.aiScore}%`, background: claim.aiScore > 80 ? '#10b981' : claim.aiScore > 60 ? '#f59e0b' : '#f43f5e' }} />
                  <span>{claim.aiScore}%</span>
                </div>
              </span>
              <span>
                <span className="status-badge" style={{ color: STATUS_COLOR[claim.status], borderColor: `${STATUS_COLOR[claim.status]}33`, background: `${STATUS_COLOR[claim.status]}11` }}>
                  {claim.status}
                </span>
              </span>
              <span>
                <span className="risk-badge" style={{ color: RISK_COLOR[claim.risk] }}>
                  <span className="risk-dot" style={{ background: RISK_COLOR[claim.risk] }} />
                  {claim.risk}
                </span>
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function FileIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>
  );
}
