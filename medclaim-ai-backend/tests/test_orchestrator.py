from backend.app.orchestrators.claim_review_orchestrator import (
    ClaimReviewOrchestrator
)

orchestrator = (
    ClaimReviewOrchestrator()
)

result = orchestrator.review_claim(
    "data/claims/claim_001.json"
)

print(result["final_decision"])