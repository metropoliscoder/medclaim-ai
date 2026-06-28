from datetime import datetime
from typing import Any

from backend.app.config.job_progress import JOB_PROGRESS
from backend.app.config.job_stage import JOB_STAGE
from backend.app.models.job import Job
from backend.app.models.job_status import JobStatus


class JobService:

    def __init__(self):
        self.jobs: dict[str, Job] = {}

    # --------------------------------------------------
    # Create Job
    # --------------------------------------------------

    def create_job(self) -> Job:

        job = Job()

        self.jobs[job.job_id] = job

        return job

    # --------------------------------------------------
    # Get Job
    # --------------------------------------------------

    def get_job(self, job_id: str) -> Job | None:

        return self.jobs.get(job_id)

    # --------------------------------------------------
    # Update Status
    # --------------------------------------------------

    def update_status(
        self,
        job_id: str,
        status: JobStatus,
    ) -> Job | None:

        job = self.get_job(job_id)

        if job is None:
            return None

        job.status = status

        job.progress = JOB_PROGRESS[status]

        job.current_stage = JOB_STAGE[status]

        job.updated_at = datetime.utcnow()

        if status == JobStatus.COMPLETED:
            job.completed_at = datetime.utcnow()

        return job

    # --------------------------------------------------
    # Attach Uploaded Files
    # --------------------------------------------------

    def attach_uploaded_files(
        self,
        job_id: str,
        uploaded_files: list[str],
    ) -> Job | None:

        job = self.get_job(job_id)

        if job is None:
            return None

        job.uploaded_files = uploaded_files

        job.updated_at = datetime.utcnow()

        return job

    # --------------------------------------------------
    # Attach Final AI Result
    # --------------------------------------------------

    def attach_result(
        self,
        job_id: str,
        result: dict[str, Any],
    ) -> Job | None:

        job = self.get_job(job_id)

        if job is None:
            return None

        job.result = result

        job.status = JobStatus.COMPLETED

        job.progress = JOB_PROGRESS[JobStatus.COMPLETED]

        job.current_stage = JOB_STAGE[JobStatus.COMPLETED]

        job.completed_at = datetime.utcnow()

        job.updated_at = datetime.utcnow()

        return job

    # --------------------------------------------------
    # Mark Failed
    # --------------------------------------------------

    def mark_failed(
        self,
        job_id: str,
        error_message: str,
    ) -> Job | None:

        job = self.get_job(job_id)

        if job is None:
            return None

        job.status = JobStatus.FAILED

        job.progress = JOB_PROGRESS[JobStatus.FAILED]

        job.current_stage = JOB_STAGE[JobStatus.FAILED]

        job.error_message = error_message

        job.updated_at = datetime.utcnow()

        return job


job_service = JobService()