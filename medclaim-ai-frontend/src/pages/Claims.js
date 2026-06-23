import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Filter, ChevronDown, X, AlertTriangle,
  CheckCircle, Clock, XCircle, Brain, FileText,
  Calendar, User, Building, Tag, ChevronRight
} from 'lucide-react';
import { CLAIMS } from '../data/mockData';
import './Claims.css';

const STATUS_META = {
  'Approved':     { color: '#10b981', icon: <CheckCircle size={13} />, bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.25)' },
  'Denied':       { color: '#f43f5e', icon: <XCircle size={13} />,    bg: 'rgba(244,63,94,0.1)',  border: 'rgba(244,63,94,0.25)' },
  'Under Review': { color: '#3b82f6', icon: <Clock size={13} />,      bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.25)' },
  'Pending Info': { color: '#f59e0b', icon: <AlertTriangle size={13} />, bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)' },
};

const RISK_META = {
  low:    { color: '#10b981', label: 'Low Risk' },
  medium: { color: '#f59e0b', label: 'Medium Risk' },
  high:   { color: '#f43f5e', label: 'High Risk' },
};

const FILTERS = ['All', 'Under Review', 'Pending Info', 'Approved', 'Denied'];
const TYPE_FILTERS = ['All Types', 'Surgery', 'Medication', 'Diagnostic', 'Emergency', 'Therapy', 'Preventive'];

function ClaimDetail({ claim, onClose }) {
  const [tab, setTab] = useState('overview');
  const sm = STATUS_META[claim.status];
  const rm = RISK_META[claim.risk];

  return (
    <motion.div
      className="detail-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="detail-panel"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 260 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="dp-header">
          <div>
            <div className="dp-id">{claim.id}</div>
            <div className="dp-patient">{claim.patient}</div>
          </div>
          <button className="dp-close" onClick={onClose}><X size={18} /></button>
        </div>

        {/* Status + Risk row */}
        <div className="dp-status-row">
          <span className="dp-status-badge" style={{ color: sm.color, background: sm.bg, borderColor: sm.border }}>
            {sm.icon} {claim.status}
          </span>
          <span className="dp-risk" style={{ color: rm.color }}>
            <span className="risk-dot-sm" style={{ background: rm.color }} />
            {rm.label}
          </span>
          <span className="dp-amount">${claim.amount.toLocaleString()}</span>
        </div>

        {/* AI Score */}
        <div className="dp-ai-score">
          <div className="dp-ai-score-header">
            <Brain size={14} color="#8b5cf6" />
            <span>AI Confidence Score</span>
            <span className="dp-score-val">{claim.aiScore}%</span>
          </div>
          <div className="dp-score-track">
            <motion.div
              className="dp-score-fill"
              initial={{ width: 0 }}
              animate={{ width: `${claim.aiScore}%` }}
              transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
              style={{
                background: claim.aiScore > 80 ? 'linear-gradient(90deg,#10b981,#06b6d4)' :
                            claim.aiScore > 60 ? 'linear-gradient(90deg,#f59e0b,#f97316)' :
                            'linear-gradient(90deg,#f43f5e,#ec4899)'
              }}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="dp-tabs">
          {['overview', 'flags', 'timeline'].map(t => (
            <button
              key={t}
              className={`dp-tab ${tab === t ? 'dp-tab--active' : ''}`}
              onClick={() => setTab(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        <div className="dp-body">
          {tab === 'overview' && (
            <motion.div className="dp-overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {[
                { icon: <User size={15} />, label: 'Patient', val: claim.patient },
                { icon: <FileText size={15} />, label: 'Diagnosis', val: claim.diagnosis },
                { icon: <Tag size={15} />, label: 'ICD Code', val: claim.icd },
                { icon: <Building size={15} />, label: 'Provider', val: claim.provider },
                { icon: <Tag size={15} />, label: 'Claim Type', val: claim.type },
                { icon: <Calendar size={15} />, label: 'Submitted', val: claim.submitted },
              ].map((row, i) => (
                <div key={i} className="dp-row">
                  <span className="dp-row-icon">{row.icon}</span>
                  <span className="dp-row-label">{row.label}</span>
                  <span className="dp-row-val">{row.val}</span>
                </div>
              ))}
            </motion.div>
          )}

          {tab === 'flags' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {claim.flags.length === 0 ? (
                <div className="dp-no-flags">
                  <CheckCircle size={32} color="#10b981" />
                  <span>No flags detected by AI</span>
                </div>
              ) : (
                <div className="dp-flags">
                  {claim.flags.map((f, i) => (
                    <motion.div
                      key={i}
                      className="dp-flag"
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <AlertTriangle size={14} color="#f59e0b" />
                      <span>{f}</span>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {tab === 'timeline' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {claim.timeline.length === 0 ? (
                <div className="dp-no-flags"><span>No timeline data</span></div>
              ) : (
                <div className="dp-timeline">
                  {claim.timeline.map((ev, i) => (
                    <div key={i} className="tl-item">
                      <div className="tl-dot" />
                      {i < claim.timeline.length - 1 && <div className="tl-line" />}
                      <div className="tl-content">
                        <div className="tl-event">{ev.event}</div>
                        <div className="tl-date">{ev.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Actions */}
        <div className="dp-actions">
          <button className="dp-btn dp-btn--approve">Approve Claim</button>
          <button className="dp-btn dp-btn--request">Request Info</button>
          <button className="dp-btn dp-btn--deny">Deny</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Claims() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [selected, setSelected] = useState(null);

  const filtered = CLAIMS.filter(c => {
    const matchSearch = c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.patient.toLowerCase().includes(search.toLowerCase()) ||
      c.provider.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || c.status === statusFilter;
    const matchType = typeFilter === 'All Types' || c.type === typeFilter;
    return matchSearch && matchStatus && matchType;
  });

  return (
    <div className="claims-page">
      {/* Header */}
      <motion.div className="claims-header" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
        <div>
          <h1>Claims Review</h1>
          <p>{filtered.length} claims {statusFilter !== 'All' ? `· ${statusFilter}` : ''}</p>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div className="claims-filters" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <div className="search-wrap">
          <Search size={15} color="#64748b" />
          <input
            type="text"
            placeholder="Search by ID, patient, provider…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && <button onClick={() => setSearch('')}><X size={14} /></button>}
        </div>

        <div className="filter-pills">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`filter-pill ${statusFilter === f ? 'filter-pill--active' : ''}`}
              onClick={() => setStatusFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <select
          className="type-select"
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
        >
          {TYPE_FILTERS.map(t => <option key={t}>{t}</option>)}
        </select>
      </motion.div>

      {/* Table */}
      <motion.div className="claims-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <div className="ct-head">
          <span>Claim ID</span>
          <span>Patient</span>
          <span>Type</span>
          <span>Provider</span>
          <span>Amount</span>
          <span>AI Score</span>
          <span>Status</span>
          <span>Risk</span>
          <span></span>
        </div>

        <div className="ct-body">
          {filtered.length === 0 && (
            <div className="ct-empty">
              <FileText size={32} color="#334155" />
              <span>No claims match your filters</span>
            </div>
          )}
          {filtered.map((claim, i) => {
            const sm = STATUS_META[claim.status];
            const rm = RISK_META[claim.risk];
            return (
              <motion.div
                key={claim.id}
                className="ct-row"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ backgroundColor: 'rgba(59,130,246,0.04)' }}
                onClick={() => setSelected(claim)}
              >
                <span className="ct-id">{claim.id}</span>
                <span className="ct-patient">
                  <div className="ct-avatar">{claim.patient.charAt(0)}</div>
                  {claim.patient}
                </span>
                <span>
                  <span className="ct-type">{claim.type}</span>
                </span>
                <span className="ct-provider">{claim.provider}</span>
                <span className="ct-amount">${claim.amount.toLocaleString()}</span>
                <span>
                  <div className="ct-score-wrap">
                    <div className="ct-score-bar-bg">
                      <div
                        className="ct-score-bar-fill"
                        style={{
                          width: `${claim.aiScore}%`,
                          background: claim.aiScore > 80 ? '#10b981' : claim.aiScore > 60 ? '#f59e0b' : '#f43f5e'
                        }}
                      />
                    </div>
                    <span>{claim.aiScore}%</span>
                  </div>
                </span>
                <span>
                  <span className="ct-status" style={{ color: sm.color, background: sm.bg, borderColor: sm.border }}>
                    {sm.icon} {claim.status}
                  </span>
                </span>
                <span>
                  <span className="ct-risk" style={{ color: rm.color }}>
                    <span className="risk-dot-sm" style={{ background: rm.color }} />
                    {claim.risk}
                  </span>
                </span>
                <span className="ct-arrow"><ChevronRight size={16} color="#475569" /></span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Detail panel */}
      <AnimatePresence>
        {selected && <ClaimDetail claim={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}
