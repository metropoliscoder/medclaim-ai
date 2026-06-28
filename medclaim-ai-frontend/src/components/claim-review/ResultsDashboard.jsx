import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ShieldAlert,
  TrendingUp,
  FileText,
  Flag,
} from "lucide-react";
import "./ResultsDashboard.css";

// ── Fallback mock for when the API hasn't returned yet / for dev preview ──
const MOCK = {
  decision: "Approved",
  confidence: 87,
  summary:
    "The submitted claim documents are consistent with the patient's diagnosed condition and the policy coverage. All procedure codes are valid and within covered benefit limits. Minor documentation gaps were noted but do not affect eligibility.",
  scores: [
    { label: "Document Completeness", value: 92 },
    { label: "Medical Validity", value: 85 },
    { label: "Policy Alignment", value: 88 },
    { label: "Fraud Risk", value: 12, inverted: true },
  ],
  flags: [
    { severity: "info", text: "Discharge summary date is 2 days after admission — confirm accuracy." },
    { severity: "warning", text: "Procedure code 99214 used 3 times — verify necessity documentation." },
  ],
  step_results: [
    { step: "Claim Extraction", status: "ok", note: "All 4 fields extracted successfully." },
    { step: "Medical Review", status: "ok", note: "ICD-10 codes valid and consistent." },
    { step: "Policy Validation", status: "warning", note: "One sub-limit threshold approached." },
    { step: "Decision Agent", status: "ok", note: "Recommendation: Approve with standard payout." },
    { step: "Audit Logging", status: "ok", note: "Decision trail recorded." },
  ],
};

function ScoreRing({ value, inverted }) {
  const display = inverted ? 100 - value : value;
  const color =
    display >= 80 ? "#22c55e" : display >= 60 ? "#f59e0b" : "#ef4444";
  const r = 28;
  const circ = 2 * Math.PI * r;
  const fill = (display / 100) * circ;

  return (
    <svg width="72" height="72" viewBox="0 0 72 72">
      <circle cx="36" cy="36" r={r} fill="none" stroke="#1e293b" strokeWidth="6" />
      <circle
        cx="36"
        cy="36"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeDasharray={`${fill} ${circ}`}
        strokeLinecap="round"
        transform="rotate(-90 36 36)"
        style={{ transition: "stroke-dasharray 1s ease" }}
      />
      <text
        x="36"
        y="40"
        textAnchor="middle"
        fill="white"
        fontSize="13"
        fontWeight="700"
      >
        {inverted ? `${value}%` : `${display}%`}
      </text>
    </svg>
  );
}

const SEVERITY_META = {
  info: { icon: AlertTriangle, color: "info" },
  warning: { icon: ShieldAlert, color: "warning" },
  error: { icon: XCircle, color: "error" },
};

const STEP_STATUS_META = {
  ok: { icon: CheckCircle2, color: "#22c55e" },
  warning: { icon: AlertTriangle, color: "#f59e0b" },
  error: { icon: XCircle, color: "#ef4444" },
};

export default function ResultsDashboard({ results, error }) {
  let data = MOCK;

if (results) {

  const finalDecision = results.final_decision || {};
  const medical = results.medical_review || {};
  const policy = results.policy_review || {};
  const claim = results.claim || {};

  data = {

    decision: finalDecision.decision || "Pending",

    confidence: Math.round(
      Math.max(
        finalDecision.medical_confidence || 0,
        finalDecision.policy_confidence || 0
      ) * 100
    ),

    summary:
      finalDecision.reasoning ||
      "No reasoning available.",

    scores: [

      {
        label: "Medical Review",
        value: Math.round(
          (finalDecision.medical_confidence || 0) * 100
        ),
      },

      {
        label: "Policy Review",
        value: Math.round(
          (finalDecision.policy_confidence || 0) * 100
        ),
      },

      {
        label: "Claim Amount",
        value: claim.billing
          ? Math.min(
              Math.round(
                (claim.billing.claim_amount /
                  claim.billing.claim_amount) *
                  100
              ),
              100
            )
          : 100,
      },

      {
        label: "Coverage",
        value: 100,
      },

    ],

    flags: [

      {
        severity:
          medical.status === "PASS"
            ? "info"
            : "warning",

        text:
          medical.reasoning ||
          "Medical review completed.",
      },

      {
        severity:
          policy.status === "PASS"
            ? "info"
            : "warning",

        text:
          policy.reasoning ||
          "Policy review completed.",
      },

    ],

    step_results: [

      {
        step: "Medical Review",
        status:
          medical.status === "PASS"
            ? "ok"
            : "error",

        note:
          medical.reasoning ||
          "Completed",
      },

      {
        step: "Policy Review",
        status:
          policy.status === "PASS"
            ? "ok"
            : "error",

        note:
          policy.reasoning ||
          "Completed",
      },

      {
        step: "Decision Agent",
        status:
          finalDecision.decision === "APPROVE"
            ? "ok"
            : "warning",

        note:
          finalDecision.reasoning ||
          "Decision generated.",
      },

    ],

  };

}

  if (error) {
    return (
      <div className="results-entrance">
        <div className="results-error">
          <XCircle size={32} />
          <div>
            <strong>Analysis failed</strong>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const isApproved =
String(data.decision)
  .toUpperCase()
  .includes("APPROVE");
  const DecisionIcon = isApproved ? CheckCircle2 : XCircle;

  return (
    <div className="results-entrance">
      <div className="results-section-label">
        <TrendingUp size={15} />
        Analysis Results
      </div>

      {/* ── Decision hero ── */}
      <div className={`decision-card decision-card--${isApproved ? "approved" : "denied"}`}>
        <div className="decision-icon-wrap">
          <DecisionIcon size={28} />
        </div>
        <div className="decision-body">
          <h2>{
          data.decision === "APPROVE"
            ? "APPROVED"
            : data.decision === "REJECT"
            ? "REJECTED"
            : data.decision
          }</h2>
          <p>{data.summary}</p>
        </div>
        <div className="confidence-pill">
          <span>Confidence</span>
          <strong>{data.confidence}%</strong>
        </div>
      </div>

      {/* ── Score grid ── */}
      {data.scores?.length > 0 && (
        <div className="scores-grid">
          {data.scores.map((s, i) => (
            <div key={i} className="score-card">
              <ScoreRing value={s.value} inverted={s.inverted} />
              <span className="score-label">{s.label}</span>
              {s.inverted && (
                <span className="score-sublabel">Risk score</span>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="results-bottom-grid">
        {/* ── Flags ── */}
        {data.flags?.length > 0 && (
          <div className="results-panel">
            <div className="panel-header">
              <Flag size={15} />
              <h3>AI Findings</h3>
              <span className="panel-count">{data.flags.length}</span>
            </div>
            <div className="flags-list">
              {data.flags.map((flag, i) => {
                const meta = SEVERITY_META[flag.severity] || SEVERITY_META.info;
                const Icon = meta.icon;
                return (
                  <div key={i} className={`flag-item flag-item--${meta.color}`}>
                    <Icon size={15} className="flag-icon" />
                    <span>{flag.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Per-step breakdown ── */}
        {data.step_results?.length > 0 && (
          <div className="results-panel">
            <div className="panel-header">
              <FileText size={15} />
              <h3>Step Breakdown</h3>
            </div>
            <div className="steps-list">
              {data.step_results.map((s, i) => {
                const meta = STEP_STATUS_META[s.status] || STEP_STATUS_META.ok;
                const Icon = meta.icon;
                return (
                  <div key={i} className="step-result-item">
                    <Icon size={15} style={{ color: meta.color, flexShrink: 0 }} />
                    <div>
                      <strong>{s.step}</strong>
                      <p>{s.note}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}