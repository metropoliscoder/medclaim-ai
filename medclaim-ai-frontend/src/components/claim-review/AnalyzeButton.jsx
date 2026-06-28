import { Loader, Sparkles, RotateCcw } from "lucide-react";
import "./AnalyzeButton.css";

export default function AnalyzeButton({ files, phase, onAnalyze, onReset }) {
  const isEmpty = files.length === 0;
  const isRunning = phase === "running";
  const isDone = phase === "done" || phase === "error";

  if (isDone) {
    return (
      <div className="analyze-wrap">
        <button className="analyze-btn analyze-btn--reset" onClick={onReset}>
          <RotateCcw size={18} />
          Start New Review
        </button>
      </div>
    );
  }

  return (
    <div className="analyze-wrap">
      <button
        className={`analyze-btn ${isRunning ? "analyze-btn--running" : ""} ${
          isEmpty || isRunning ? "analyze-btn--disabled" : ""
        }`}
        onClick={onAnalyze}
        disabled={isEmpty || isRunning}
      >
        {isRunning ? (
          <>
            <Loader size={18} className="btn-spinner" />
            Analyzing Claim…
          </>
        ) : (
          <>
            <Sparkles size={18} />
            Analyze Claim
          </>
        )}
      </button>

      {isEmpty && !isRunning && (
        <p className="analyze-hint">Upload at least one document to continue</p>
      )}
    </div>
  );
}