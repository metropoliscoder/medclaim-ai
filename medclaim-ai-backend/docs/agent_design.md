Agent Architecture

1. Document Intake Agent
    Purpose: Identify uploaded claim documents.
    Responsibilities:
        - Document classification
        - File validation
        - Missing document detection

2. Claim Extraction Agent
    Purpose: Convert documents into structured claim data.
    Responsibilities:
        - Extract patient details
        - Extract treatment details
        - Extract financial details

3. Medical Review Agent
    Purpose: Evaluate medical validity.
    Responsibilities:
        Check:
            - Diagnosis validity
            - Procedure consistency
            - Treatment justification

4. Policy Compliance Agent
    Purpose: Verify insurance coverage.
    Uses:
        - RAG
        - Policy documents
        - Coverage rules
    Checks:
        - Coverage eligibility
        - Exclusions
        - Waiting period

5. Billing Review Agent
    Purpose: Review financial claim data.
    Checks:
        - Duplicate charges
        - Missing invoices
        - Excessive charges
        - Amount consistency

6. Evidence Verification Agent
    Purpose: Cross-validate findings from all agents.

7. Decision Agent
    Purpose: Generate final recommendation.
    Inputs
        Outputs from:
            - Medical Review Agent
            - Policy Agent
            - Billing Agent
            - Evidence Agent
    Logic: Aggregate evidence.

    Generate:
        - Recommendation
        - Confidence
        - Explanation


LangGraph State Shared Across Agents

Every agent reads and updates a common state.
- claim_id
- documents
- extracted_claim
- medical_review
- policy_review
- billing_review
- evidence_review
- final_decision
- audit_log