from backend.app.models.job_status import JobStatus

JOB_STAGE = {
    JobStatus.CREATED: "Job Created",
    JobStatus.UPLOADED: "Files Uploaded",
    JobStatus.VALIDATING_FILES: "Validating Files",
    JobStatus.EXTRACTING_CLAIM: "Extracting Claim Information",
    JobStatus.MEDICAL_REVIEW: "Running Medical Review",
    JobStatus.POLICY_RETRIEVAL: "Retrieving Policy Information",
    JobStatus.POLICY_REVIEW: "Reviewing Insurance Policy",
    JobStatus.DECISION: "Generating Final Decision",
    JobStatus.AUDIT: "Saving Audit Record",
    JobStatus.COMPLETED: "Completed",
    JobStatus.FAILED: "Processing Failed",
}