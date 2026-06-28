import {
  FileSearch,
  Stethoscope,
  ShieldCheck,
  Bot,
  ClipboardCheck,
  CheckCircle,
  Loader,
  Circle,
} from "lucide-react";
import "./AIPipeline.css";

const STEPS = [
  { title: "Claim Extraction", icon: FileSearch, description: "Parsing document structure & fields" },
  { title: "Medical Review", icon: Stethoscope, description: "Verifying diagnoses & procedure codes" },
  { title: "Policy Validation", icon: ShieldCheck, description: "Checking coverage rules & exclusions" },
  { title: "Decision Agent", icon: Bot, description: "Generating approval recommendation" },
  { title: "Audit Logging", icon: ClipboardCheck, description: "Recording decision trail" },
];

export default function AIPipeline({ activeStep, completedSteps, phase }) {
  return (
    <div className="pipeline-card">
      <div className="pipeline-card-header">
        <h2>AI Processing Pipeline</h2>
        <span className={`pipeline-status-badge pipeline-status-${phase}`}>
          {phase === "idle" && "Awaiting documents"}
          {phase === "running" && "Processing…"}
          {phase === "done" && "Complete"}
          {phase === "error" && "Failed"}
        </span>
      </div>

      <p>Multi-agent workflow executed for every claim review.</p>

      <div className="pipeline-list">
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          const isComplete = completedSteps.includes(index);
          const isActive = activeStep === index;
          const state = isComplete ? "complete" : isActive ? "active" : "pending";

          return (
            <div key={index} className={`pipeline-item pipeline-item--${state}`}>
              <div className="pipeline-item-left">
                <div className={`pipeline-icon-wrap pipeline-icon-wrap--${state}`}>
                  <Icon size={16} />
                </div>
                <div className="pipeline-item-text">
                  <span className="pipeline-item-title">{step.title}</span>
                  <span className="pipeline-item-desc">{step.description}</span>
                </div>
              </div>

              <div className="pipeline-item-status">
                {isComplete && <CheckCircle size={18} className="status-icon status-complete" />}
                {isActive && <Loader size={18} className="status-icon status-active spinning" />}
                {!isComplete && !isActive && <Circle size={16} className="status-icon status-pending" />}
              </div>

              {/* Progress bar that fills when active */}
              {isActive && <div className="pipeline-progress-bar" />}
            </div>
          );
        })}
      </div>

      {phase === "running" && (
        <div className="pipeline-footer">
          <div className="pipeline-pulse" />
          <span>Agents are reviewing your documents…</span>
        </div>
      )}
    </div>
  );
}