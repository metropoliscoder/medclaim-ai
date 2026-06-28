from datetime import datetime
from typing import Any
from uuid import uuid4

from pydantic import BaseModel, Field

from backend.app.models.job_status import JobStatus


class Job(BaseModel):

    job_id: str = Field(
        default_factory=lambda: str(uuid4())
    )

    status: JobStatus = JobStatus.CREATED

    progress: int = 0

    current_stage: str = "Created"

    uploaded_files: list[str] = Field(default_factory=list)

    # ✅ Final AI Result
    result: dict[str, Any] | None = None

    # Error if job fails
    error_message: str | None = None

    created_at: datetime = Field(
        default_factory=datetime.utcnow
    )

    updated_at: datetime = Field(
        default_factory=datetime.utcnow
    )

    completed_at: datetime | None = None