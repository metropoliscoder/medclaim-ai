import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Send, Sparkles, FileText, AlertTriangle, TrendingUp, RotateCcw, ChevronRight } from 'lucide-react';
import './AIAssistant.css';

const SUGGESTIONS = [
  { icon: <AlertTriangle size={14} />, text: 'Analyze high-risk claims from this week' },
  { icon: <FileText size={14} />, text: 'Summarize CLM-2024-00891 for review' },
  { icon: <TrendingUp size={14} />, text: 'What\'s the trend in medication claims?' },
  { icon: <Sparkles size={14} />, text: 'Flag claims with missing prior authorizations' },
];

const AI_RESPONSES = {
  default: [
    `I've analyzed your query using the ClaimIQ neural network. Here's what I found:\n\n**Key Insights:**\n- 3 claims flagged for elevated risk this week\n- CLM-2024-00891 has a missing prior authorization which is the primary concern\n- Medication claims are up 14% versus last month\n\nWould you like me to drill deeper into any specific area?`,
    `Based on my analysis of your claims database, I can see several patterns worth noting.\n\n**Risk Distribution:**\n- High risk: 12 claims (8.3%)\n- Medium risk: 34 claims (23.6%)\n- Low risk: 98 claims (68.1%)\n\nThe high-risk cluster shows a pattern around out-of-network surgical providers. I recommend prioritizing these for manual review.`,
    `I've run a comprehensive analysis. Here's a summary:\n\n**Claim CLM-2024-00891:**\n- Missing prior authorization is the critical flag\n- Provider St. Mary's Medical Center is out-of-network\n- Amount ($42,850) exceeds threshold by 28%\n- Recommended action: Request prior auth documentation before approval`,
    `Medication claim trends show a significant shift. Key findings:\n\n**Biologics up 31%** - primarily for autoimmune conditions\n**Step therapy compliance** at 74% — below the 85% target\n**Average claim value:** $8,200 (up from $6,100 last quarter)\n\nRecommendation: Update step therapy protocols and flag all biologic claims for enhanced review.`,
  ]
};

let responseIdx = 0;

function TypingMessage({ content, onDone }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const idx = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (idx.current < content.length) {
        setDisplayed(content.slice(0, idx.current + 1));
        idx.current++;
      } else {
        clearInterval(interval);
        setDone(true);
        onDone?.();
      }
    }, 12);
    return () => clearInterval(interval);
  }, [content]);

  return <div className="msg-content ai-content" dangerouslySetInnerHTML={{ __html: formatMarkdown(displayed) }} />;
}

function formatMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n\n/g, '<br/><br/>')
    .replace(/\n- /g, '<br/>• ')
    .replace(/\n/g, '<br/>');
}

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'ai',
      content: "Hello! I'm ClaimIQ AI, your intelligent claims review assistant. I can analyze claims, detect fraud patterns, summarize complex cases, and provide decision support.\n\nWhat would you like to explore today?",
      done: true,
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim() || loading) return;
    const userMsg = { id: Date.now(), role: 'user', content: text, done: true };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    await new Promise(r => setTimeout(r, 900 + Math.random() * 600));

    const response = AI_RESPONSES.default[responseIdx % AI_RESPONSES.default.length];
    responseIdx++;
    const aiMsg = { id: Date.now() + 1, role: 'ai', content: response, done: false };
    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);
  };

  const markDone = (id) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, done: true } : m));
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  };

  const reset = () => {
    setMessages([{
      id: 1, role: 'ai',
      content: "Session cleared. How can I assist with your claims review today?",
      done: true,
    }]);
  };

  return (
    <div className="ai-page">
      {/* Header */}
      <motion.div className="ai-header" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="ai-header-left">
          <motion.div
            className="ai-brain-icon"
            animate={{ boxShadow: ['0 0 12px rgba(139,92,246,0.3)', '0 0 28px rgba(139,92,246,0.6)', '0 0 12px rgba(139,92,246,0.3)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Brain size={22} color="#8b5cf6" />
          </motion.div>
          <div>
            <h1>ClaimIQ AI Assistant</h1>
            <p>Neural-powered claim analysis & decision support</p>
          </div>
        </div>
        <div className="ai-header-right">
          <div className="ai-live-badge">
            <span className="live-dot" />
            <span>Online</span>
          </div>
          <button className="ai-reset-btn" onClick={reset}>
            <RotateCcw size={14} /> New Session
          </button>
        </div>
      </motion.div>

      <div className="ai-layout">
        {/* Chat */}
        <div className="ai-chat-wrap">
          <div className="ai-messages">
            {messages.map((msg, i) => (
              <motion.div
                key={msg.id}
                className={`msg-wrap ${msg.role === 'user' ? 'msg-wrap--user' : 'msg-wrap--ai'}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
              >
                {msg.role === 'ai' && (
                  <div className="msg-avatar-ai">
                    <Brain size={14} color="#8b5cf6" />
                  </div>
                )}
                <div className={`msg-bubble ${msg.role === 'ai' ? 'msg-bubble--ai' : 'msg-bubble--user'}`}>
                  {msg.role === 'ai' && !msg.done ? (
                    <TypingMessage content={msg.content} onDone={() => markDone(msg.id)} />
                  ) : (
                    <div
                      className="msg-content"
                      dangerouslySetInnerHTML={{ __html: formatMarkdown(msg.content) }}
                    />
                  )}
                </div>
              </motion.div>
            ))}

            {/* Loading indicator */}
            <AnimatePresence>
              {loading && (
                <motion.div
                  className="msg-wrap msg-wrap--ai"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="msg-avatar-ai"><Brain size={14} color="#8b5cf6" /></div>
                  <div className="msg-bubble msg-bubble--ai">
                    <div className="typing-dots">
                      {[0,1,2].map(i => (
                        <motion.span
                          key={i}
                          animate={{ y: [0, -6, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          {messages.length <= 2 && (
            <div className="ai-suggestions">
              {SUGGESTIONS.map((s, i) => (
                <motion.button
                  key={i}
                  className="suggestion-chip"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  onClick={() => sendMessage(s.text)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="suggestion-icon">{s.icon}</span>
                  <span>{s.text}</span>
                  <ChevronRight size={12} color="#475569" />
                </motion.button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="ai-input-area">
            <div className="ai-input-wrap">
              <textarea
                ref={inputRef}
                rows={1}
                placeholder="Ask about claims, risks, patterns, decisions…"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                disabled={loading}
              />
              <motion.button
                className="ai-send-btn"
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || loading}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
              >
                <Send size={16} />
              </motion.button>
            </div>
            <div className="ai-input-hint">Press Enter to send · Shift+Enter for new line</div>
          </div>
        </div>

        {/* Sidebar info panel */}
        <motion.div
          className="ai-info-panel"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="aip-section">
            <div className="aip-title">AI Capabilities</div>
            {[
              'Claim risk scoring & analysis',
              'Fraud pattern detection',
              'ICD code validation',
              'Prior auth verification',
              'Policy compliance check',
              'Decision recommendations',
            ].map((cap, i) => (
              <div key={i} className="aip-cap">
                <span className="aip-cap-dot" />
                <span>{cap}</span>
              </div>
            ))}
          </div>

          <div className="aip-section">
            <div className="aip-title">Today's Stats</div>
            {[
              { label: 'Claims analyzed', val: '1,284' },
              { label: 'Auto-approved', val: '892' },
              { label: 'Flagged for review', val: '47' },
              { label: 'Avg AI response', val: '1.2s' },
            ].map((s, i) => (
              <div key={i} className="aip-stat">
                <span className="aip-stat-label">{s.label}</span>
                <span className="aip-stat-val">{s.val}</span>
              </div>
            ))}
          </div>

          <div className="aip-section">
            <div className="aip-title">Model Info</div>
            <div className="aip-model-card">
              <div className="aip-model-name">ClaimIQ Neural v4</div>
              <div className="aip-model-detail">Trained on 2.4M+ healthcare claims</div>
              <div className="aip-pulse-wrap">
                {Array.from({ length: 20 }, (_, i) => (
                  <motion.div
                    key={i}
                    className="aip-pulse-bar"
                    animate={{ height: [2, Math.random() * 18 + 2, 2] }}
                    transition={{ duration: 0.5 + Math.random() * 0.5, repeat: Infinity, delay: i * 0.06 }}
                  />
                ))}
              </div>
              <div className="aip-acc">97.3% accuracy</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
