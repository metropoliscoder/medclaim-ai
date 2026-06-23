from backend.app.services.claim_loader import (
    ClaimLoader
)

from backend.app.services.medical_knowledge_service import (
    MedicalKnowledgeService
)

from backend.app.services.medical_review_service import (
    review_claim
)

from backend.app.services.policy_vector_store_service import (
    PolicyVectorStoreService
)

from backend.app.services.policy_extraction_service import (
    extract_policy_information
)

from backend.app.services.policy_review_service import (
    review_policy
)

from backend.app.services.decision_service import (
    make_final_decision
)

from backend.app.services.audit_service import (
    AuditService
)

class ClaimReviewOrchestrator:

    def __init__(self):

        self.medical_knowledge_service = (
            MedicalKnowledgeService(
                "data/medical/medical_reference.json"
            )
        )

        self.vector_store = (
            PolicyVectorStoreService()
        )

        self.audit_service = (
            AuditService()
        )

    def review_claim(
            self,
            claim_file_path: str
    ):
        claim = ClaimLoader.load_claim(
            claim_file_path
        )
        diagnosis_info = (
            self.medical_knowledge_service
            .get_diagnosis_info(
                claim.treatment.diagnosis
            )
        )

        medical_review = review_claim(
            claim,
            diagnosis_info
        )
        results = self.vector_store.search(
                query=f"""
            Procedure:
            {claim.treatment.procedure_name}

            Claim Amount:
            {claim.billing.claim_amount}
            """
        )
        context = "\n\n".join(
            match["metadata"]["text"]
            for match in results["matches"]
        )
        policy = extract_policy_information(
            context
        )
        policy_review = review_policy(
            claim,
            policy
        )
        final_decision = make_final_decision(
            medical_review,
            policy_review
        )
        self.audit_service.create_and_save_audit_record(
            claim,
            medical_review,
            policy_review,
            final_decision
        )

        return {
            "claim": claim,
            "medical_review": medical_review,
            "policy_review": policy_review,
            "final_decision": final_decision
        }