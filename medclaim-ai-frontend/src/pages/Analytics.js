import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, LineChart, Line, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Legend, Cell
} from 'recharts';
import { MONTHLY_DATA, CLAIM_TYPES } from '../data/mockData';
import './Analytics.css';

const PROCESSING_DATA = [
  { day: 'Mon', time: 2.1 }, { day: 'Tue', time: 1.9 }, { day: 'Wed', time: 1.6 },
  { day: 'Thu', time: 2.3 }, { day: 'Fri', time: 1.8 }, { day: 'Sat', time: 1.4 }, { day: 'Sun', time: 1.2 },
];

const RADAR_DATA = [
  { metric: 'Accuracy', score: 97 }, { metric: 'Speed', score: 88 },
  { metric: 'Coverage', score: 82 }, { metric: 'Fraud Det.', score: 91 },
  { metric: 'Compliance', score: 95 }, { metric: 'User Sat.', score: 86 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div className="tooltip-label">{label}</div>
      {payload.map((p, i) => (
        <div key={i} className="tooltip-row">
          <span style={{ color: p.color }}>{p.name || p.dataKey}</span>
          <span>{p.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function Analytics() {
  return (
    <div className="analytics-page">
      <motion.div className="analytics-header" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
        <div>
          <h1>Analytics</h1>
          <p>Claims performance insights & AI model metrics</p>
        </div>
        <div className="analytics-period">
          {['7D', '30D', '90D', 'YTD'].map((p, i) => (
            <button key={p} className={`period-btn ${i === 1 ? 'period-btn--active' : ''}`}>{p}</button>
          ))}
        </div>
      </motion.div>

      <div className="analytics-grid">
        {/* Monthly bar chart */}
        <motion.div className="ac ac--wide" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="ac-header">
            <h3>Monthly Claims Volume</h3>
            <p>Approved · Denied · Pending</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={MONTHLY_DATA} margin={{ top: 8, right: 8, left: -16, bottom: 0 }} barSize={14} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="approved" name="Approved" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="denied" name="Denied" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pending" name="Pending" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* AI Radar */}
        <motion.div className="ac" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <div className="ac-header">
            <h3>AI Model Performance</h3>
            <p>Multi-dimensional score</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={RADAR_DATA}>
              <PolarGrid stroke="rgba(255,255,255,0.06)" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: '#64748b', fontSize: 11 }} />
              <Radar dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.15} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Processing time */}
        <motion.div className="ac" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="ac-header">
            <h3>Processing Time</h3>
            <p>Avg days per claim this week</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={PROCESSING_DATA} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 3]} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="time" name="Days" stroke="#06b6d4" strokeWidth={2.5} dot={{ fill: '#06b6d4', r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Claim types breakdown */}
        <motion.div className="ac ac--wide" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <div className="ac-header">
            <h3>Claim Type Breakdown</h3>
            <p>Distribution & avg amount by category</p>
          </div>
          <div className="claim-type-bars">
            {[
              { type: 'Diagnostic', pct: 31, avg: 3200, color: '#06b6d4' },
              { type: 'Surgery', pct: 28, avg: 38400, color: '#3b82f6' },
              { type: 'Medication', pct: 22, avg: 8100, color: '#8b5cf6' },
              { type: 'Emergency', pct: 12, avg: 14800, color: '#f43f5e' },
              { type: 'Therapy', pct: 7, avg: 1900, color: '#10b981' },
            ].map((item, i) => (
              <div key={i} className="ctb-row">
                <span className="ctb-type">{item.type}</span>
                <div className="ctb-bar-wrap">
                  <motion.div
                    className="ctb-bar"
                    initial={{ width: 0 }}
                    animate={{ width: `${item.pct * 2.5}%` }}
                    transition={{ duration: 0.8, delay: 0.4 + i * 0.1, ease: 'easeOut' }}
                    style={{ background: item.color }}
                  />
                </div>
                <span className="ctb-pct">{item.pct}%</span>
                <span className="ctb-avg">${item.avg.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* KPI row */}
      <div className="kpi-row">
        {[
          { label: 'Claims Auto-Approved', value: '69.4%', delta: '+3.2%', color: '#10b981' },
          { label: 'Fraud Detection Rate', value: '98.1%', delta: '+0.8%', color: '#3b82f6' },
          { label: 'Avg Claim Value', value: '$12,400', delta: '+5.1%', color: '#8b5cf6' },
          { label: 'Denial Appeal Rate', value: '8.3%', delta: '-1.2%', color: '#f59e0b' },
        ].map((kpi, i) => (
          <motion.div
            key={i}
            className="kpi-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + i * 0.07 }}
            style={{ '--kpi-color': kpi.color }}
          >
            <div className="kpi-label">{kpi.label}</div>
            <div className="kpi-value" style={{ color: kpi.color }}>{kpi.value}</div>
            <div className="kpi-delta" style={{ color: kpi.delta.startsWith('+') ? '#10b981' : '#f43f5e' }}>
              {kpi.delta} vs last month
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
