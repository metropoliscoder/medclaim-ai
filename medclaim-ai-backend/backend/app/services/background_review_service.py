from backend.app.models.job_status import JobStatus
from backend.app.services.job_service import job_service
from backend.app.orchestrators.claim_review_orchestrator import (
    ClaimReviewOrchestrator,
)

import traceback


class BackgroundReviewService:

    def __init__(self):

        self.claim_orchestrator = ClaimReviewOrchestrator()

    def process_job(self, job_id: str):

        try:

            print("=" * 60)
            print("BACKGROUND REVIEW STARTED")
            print("=" * 60)

            job_service.update_status(
                job_id,
                JobStatus.EXTRACTING_CLAIM,
            )

            print("Running AI Claim Review...")

            result = self.claim_orchestrator.review_claim(
                "data/claims/claim_001.json"
            )

            print("AI Review Finished")

            if hasattr(result, "model_dump"):
                result = result.model_dump()

            job_service.attach_result(
                job_id,
                result,
            )

            print("Result saved successfully.")

        except Exception as e:

            print("=" * 60)
            print("BACKGROUND REVIEW FAILED")
            print("=" * 60)

            traceback.print_exc()

            print(f"ERROR: {e}")

            job_service.mark_failed(
                job_id,
                str(e),
            )


background_review_service = BackgroundReviewService()