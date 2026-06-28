from fastapi import APIRouter, HTTPException

from backend.app.services.job_service import job_service

router = APIRouter()


@router.get("/{job_id}")
def get_job(job_id: str):

    job = job_service.get_job(job_id)

    if job is None:
        raise HTTPException(
            status_code=404,
            detail="Job not found"
        )

    return job