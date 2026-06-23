from backend.app.services.claim_loader import (
    ClaimLoader
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

# -----------------------------
# Load Claim
# -----------------------------

claim = ClaimLoader.load_claim(
    "data/claims/claim_001.json"
)

print("\n===== CLAIM =====\n")

print(claim)

# -----------------------------
# Retrieve Policy Chunks
# -----------------------------

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

# -----------------------------
# Build Context
# -----------------------------

context = "\n\n".join(
    match["metadata"]["text"]
    for match in results["matches"]
)

print("\n===== RETRIEVED POLICY CONTEXT =====\n")

print(context)

# -----------------------------
# Extract Policy Information
# -----------------------------

policy = extract_policy_information(
    context
)

print("\n===== EXTRACTED POLICY =====\n")

print(policy)

# -----------------------------
# Policy Review
# -----------------------------

policy_review = review_policy(
    claim,
    policy
)

print("\n===== POLICY REVIEW =====\n")

print(policy_review)