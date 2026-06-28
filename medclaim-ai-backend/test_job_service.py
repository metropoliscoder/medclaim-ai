from backend.app.models.job_status import JobStatus
from backend.app.services.job_service import JobService

service = JobService()

job = service.create_job()

print(job)

service.update_status(
    job.job_id,
    JobStatus.UPLOADED
)

print(service.get_job(job.job_id))

service.update_status(
    job.job_id,
    JobStatus.EXTRACTING_CLAIM
)

print(service.get_job(job.job_id))

service.update_status(
    job.job_id,
    JobStatus.MEDICAL_REVIEW
)

print(service.get_job(job.job_id))

service.update_status(
    job.job_id,
    JobStatus.COMPLETED
)

print(service.get_job(job.job_id))