import { useState } from "react";
import "./ClaimReview.css";

import UploadZone from "../components/claim-review/UploadZone";
import AIPipeline from "../components/claim-review/AIPipeline";
import UploadedFiles from "../components/claim-review/UploadedFiles";
import AnalyzeButton from "../components/claim-review/AnalyzeButton";
import ResultsDashboard from "../components/claim-review/ResultsDashboard";

import {
  uploadClaim,
  getJobStatus,
} from "../services/claimService";

export default function ClaimReview() {

  const [files, setFiles] = useState([]);

  const [phase, setPhase] = useState("idle");

  const [activeStep, setActiveStep] = useState(-1);

  const [completedSteps, setCompletedSteps] = useState([]);

  const [results, setResults] = useState(null);

  const [errorMsg, setErrorMsg] = useState("");

  const handleAnalyze = async () => {

    if (files.length < 4) {

      alert("Please upload all 4 documents.");

      return;

    }

    let interval;

    try {

      setPhase("running");

      setResults(null);

      setErrorMsg("");

      setCompletedSteps([]);

      setActiveStep(-1);

      const uploadResponse = await uploadClaim(files);


      const jobId = uploadResponse.job_id;

      interval = setInterval(async () => {

        try {

          const job = await getJobStatus(jobId);
          
          const progress = job.progress || 0;

          const completed = Math.floor(progress / 20);

          setCompletedSteps(
            Array.from(
              { length: completed },
              (_, i) => i
            )
          );

          if (completed < 5) {

            setActiveStep(completed);

          } else {

            setActiveStep(-1);

          }

          const status = String(job.status).toUpperCase();

          if (status === "COMPLETED") {

            clearInterval(interval);

            setResults(job.result);

            setCompletedSteps([0,1,2,3,4]);

            setActiveStep(-1);

            setPhase("done");

          }

          if (status === "FAILED") {

            clearInterval(interval);

            setErrorMsg(

              job.error_message ||

              "Claim processing failed."

            );

            setPhase("error");

          }

        }

        catch (pollError) {

          console.error(pollError);

          clearInterval(interval);

          setErrorMsg("Unable to fetch job status.");

          setPhase("error");

        }

      }, 2000);

    }

    catch (err) {

      console.error(err);

      if (interval) {

        clearInterval(interval);

      }

      setErrorMsg(

        err.response?.data?.detail ||

        err.message ||

        "Upload failed."

      );

      setPhase("error");

    }

  };

  const handleReset = () => {

    setPhase("idle");

    setActiveStep(-1);

    setCompletedSteps([]);

    setResults(null);

    setErrorMsg("");

  };
    return (
    <div className="claim-review">

      <div className="claim-header">

        <div className="claim-header-badge">
          AI-Powered
        </div>

        <h1>
          Healthcare Claim Review
        </h1>

        <p>
          Upload healthcare documents and let our multi-agent AI perform an
          explainable insurance review — with scores, flags and a full
          decision summary.
        </p>

      </div>

      <div className="claim-grid">

        <div className="claim-left">

          <UploadZone
            files={files}
            setFiles={setFiles}
            disabled={phase === "running"}
          />

          <UploadedFiles
            files={files}
            setFiles={setFiles}
            disabled={phase === "running"}
          />

          <AnalyzeButton
            files={files}
            phase={phase}
            onAnalyze={handleAnalyze}
            onReset={handleReset}
          />

        </div>

        <div className="claim-right">

          <AIPipeline
            activeStep={activeStep}
            completedSteps={completedSteps}
            phase={phase}
          />

        </div>

      </div>

      {(phase === "done" || phase === "error") && (

        <ResultsDashboard
          results={results}
          error={errorMsg}
        />

      )}

    </div>
  );

}