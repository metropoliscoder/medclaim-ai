import json
from datetime import datetime
from pathlib import Path

from backend.app.models.claim import Claim
from backend.app.models.audit_record import (
    AuditRecord
)
from backend.app.models.medical_review_result import (
    MedicalReviewResult
)
from backend.app.models.policy_review_result import (
    PolicyReviewResult
)
from backend.app.models.final_decision import (
    FinalDecision
)


class AuditService:

    def __init__(
            self,
            log_file: str = "audit_logs.json"
    ):

        self.log_file = log_file

        # Create file if it doesn't exist
        Path(
            self.log_file
        ).touch(
            exist_ok=True
        )


    def create_audit_record(
            self,
            claim: Claim,
            medical_review: MedicalReviewResult,
            policy_review: PolicyReviewResult,
            final_decision: FinalDecision
    ) -> AuditRecord:

        record = AuditRecord(

            claim_id=claim.claim_id,

            medical_status=medical_review.status,

            medical_confidence=medical_review.confidence,

            policy_status=policy_review.status,

            policy_confidence=policy_review.confidence,

            final_decision=final_decision.decision,

            medical_reasoning=medical_review.reasoning,

            policy_reasoning=policy_review.reasoning,

            final_reasoning=final_decision.reasoning,

            timestamp=datetime.now()
        )

        return record


    def save_audit_record(
            self,
            record: AuditRecord
    ) -> None:

        with open(
                self.log_file,
                "a"
        ) as file:

            file.write(
                record.model_dump_json()
            )

            file.write(
                "\n"
            )


    def create_and_save_audit_record(
            self,
            claim: Claim,
            medical_review: MedicalReviewResult,
            policy_review: PolicyReviewResult,
            final_decision: FinalDecision
    ) -> AuditRecord:

        record = self.create_audit_record(
            claim,
            medical_review,
            policy_review,
            final_decision
        )

        self.save_audit_record(
            record
        )

        return record