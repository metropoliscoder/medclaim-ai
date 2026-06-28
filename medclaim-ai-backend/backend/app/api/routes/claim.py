from fastapi import APIRouter, UploadFile, File, BackgroundTasks

from backend.app.orchestrators.upload_orchestrator import (
    UploadOrchestrator,
)
from backend.app.schemas.upload_response import UploadResponse

router = APIRouter()

orchestrator = UploadOrchestrator()


@router.post(
    "/upload",
    response_model=UploadResponse
)
async def upload_documents(

    background_tasks: BackgroundTasks,

    claim_form: UploadFile = File(...),
    hospital_bill: UploadFile = File(...),
    discharge_summary: UploadFile = File(...),
    policy: UploadFile = File(...),

):

    job = await orchestrator.upload_documents(
        claim_form,
        hospital_bill,
        discharge_summary,
        policy,
    )

    background_tasks.add_task(
        orchestrator.process_job,
        job.job_id,
    )

    return UploadResponse(
        job_id=job.job_id,
        status=job.status,
        progress=job.progress,
        message="Documents uploaded successfully.",
    )