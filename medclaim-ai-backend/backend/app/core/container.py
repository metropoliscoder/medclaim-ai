from backend.app.services.job_service import JobService
from backend.app.services.upload_service import UploadService
from backend.app.services.audit_service import AuditService
from backend.app.core.container import (
    job_service,
    upload_service
)

job_service = JobService()

upload_service = UploadService()

audit_service = AuditService()
class UploadOrchestrator:

    def __init__(self):

        self.job_service = job_service

        self.upload_service = upload_service