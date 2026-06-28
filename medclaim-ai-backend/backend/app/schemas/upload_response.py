from pydantic import BaseModel

from backend.app.models.job_status import JobStatus


class UploadResponse(BaseModel):

    job_id: str

    status: JobStatus

    progress: int

    message: str