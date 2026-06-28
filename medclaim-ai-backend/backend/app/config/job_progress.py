from backend.app.models.job_status import JobStatus

JOB_PROGRESS = {
    JobStatus.CREATED: 0,
    JobStatus.UPLOADED: 10,
    JobStatus.VALIDATING_FILES: 20,
    JobStatus.EXTRACTING_CLAIM: 35,
    JobStatus.MEDICAL_REVIEW: 55,
    JobStatus.POLICY_RETRIEVAL: 70,
    JobStatus.POLICY_REVIEW: 80,
    JobStatus.DECISION: 90,
    JobStatus.AUDIT: 95,
    JobStatus.COMPLETED: 100,
    JobStatus.FAILED: 0,
}