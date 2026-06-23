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

claim = ClaimLoader.load_claim(
    "data/claims/claim_001.json"
)

print("\n===== CLAIM =====\n")

print(claim)

medical_knowledge_service = (
    MedicalKnowledgeService(
        "data/medical/medical_reference.json"
    )
)

diagnosis_info = (
    medical_knowledge_service.get_diagnosis_info(
        claim.treatment.diagnosis
    )
)

medical_review = review_claim(
    claim,
    diagnosis_info
)

print("\n===== MEDICAL REVIEW =====\n")

print(medical_review)

vector_store = (
    PolicyVectorStoreService()
)

results = vector_store.search(
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

print("\n===== POLICY CONTEXT =====\n")

print(context)


policy = extract_policy_information(
    context
)

print("\n===== EXTRACTED POLICY =====\n")

print(policy)


policy_review = review_policy(
    claim,
    policy
)

print("\n===== POLICY REVIEW =====\n")

print(policy_review)

final_decision = make_final_decision(
    medical_review,
    policy_review
)

print("\n===== FINAL DECISION =====\n")

print(final_decision)