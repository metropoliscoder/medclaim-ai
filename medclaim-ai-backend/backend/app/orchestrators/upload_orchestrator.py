from backend.app.models.job_status import JobStatus

from backend.app.services.job_service import job_service
from backend.app.services.upload_service import upload_service

from backend.app.orchestrators.claim_review_orchestrator import (
    ClaimReviewOrchestrator,
)

import traceback


class UploadOrchestrator:

    def __init__(self):

        self.job_service = job_service
        self.upload_service = upload_service
        self.claim_review = ClaimReviewOrchestrator()

    async def upload_documents(
        self,
        claim_form,
        hospital_bill,
        discharge_summary,
        policy,
    ):

        # Create Job
        job = self.job_service.create_job()

        # Mark Uploaded
        self.job_service.update_status(
            job.job_id,
            JobStatus.UPLOADED,
        )

        # Save Uploaded Files
        uploaded_files = self.upload_service.save_files(
            job.job_id,
            {
                "claim_form": claim_form,
                "hospital_bill": hospital_bill,
                "discharge_summary": discharge_summary,
                "policy": policy,
            },
        )

        # Attach Files
        self.job_service.attach_uploaded_files(
            job.job_id,
            uploaded_files,
        )

        return self.job_service.get_job(
            job.job_id
        )

    def process_job(self, job_id: str):

        try:

            print("=" * 60)
            print("BACKGROUND REVIEW STARTED")
            print("=" * 60)

            # Stage 1
            self.job_service.update_status(
                job_id,
                JobStatus.EXTRACTING_CLAIM,
            )

            print("Running Claim Review...")

            result = self.claim_review.review_claim(
                "data/claims/claim_001.json"
            )

            print("Claim Review Completed")

            if hasattr(result, "model_dump"):
                result = result.model_dump()

            # Save Final Result
            self.job_service.attach_result(
                job_id,
                result,
            )

            print("Result Saved Successfully")

        except Exception as e:

            print("=" * 60)
            print("BACKGROUND REVIEW FAILED")
            print("=" * 60)

            traceback.print_exc()

            print(f"ERROR : {e}")

            self.job_service.mark_failed(
                job_id,
                str(e),
            )