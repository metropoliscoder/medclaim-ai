import os

from dotenv import load_dotenv
from openai import OpenAI

from backend.app.models.claim import Claim
from backend.app.models.extracted_policy import (
    ExtractedPolicy
)
from backend.app.models.policy_review_result import (
    PolicyReviewResult
)

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

def review_policy(
        claim: Claim,
        policy: ExtractedPolicy
) -> PolicyReviewResult:
        covered = (
            claim.treatment.procedure_name.lower()
            in
            [
                p.lower()
                for p in policy.covered_procedures
            ]
        )

        amount_ok = (
            claim.billing.claim_amount
            <= policy.coverage_limit
        )

        if covered and amount_ok:
            status = "PASS"
        else:
            status = "FAIL"

        confidence = (
            0.95
            if covered and amount_ok
            else 0.90
        )

        response = client.responses.create(
        model="gpt-4.1-mini",

        input=f"""
            You are an insurance policy reviewer.

            Procedure:
            {claim.treatment.procedure_name}

            Claim Amount:
            {claim.billing.claim_amount}

            Coverage Limit:
            {policy.coverage_limit}

            Procedure Covered:
            {covered}

            Amount Within Limit:
            {amount_ok}

            Explain the policy review decision in 2-3 sentences.
            """
                )

                # ------------------------
                # Return Result
                # ------------------------

        return PolicyReviewResult(
            status=status,
            confidence=confidence,
            covered=covered,
            procedure=claim.treatment.procedure_name,
            claim_amount=claim.billing.claim_amount,
            coverage_limit=policy.coverage_limit,
            waiting_period_days=policy.waiting_period_days,
            reasoning=response.output_text
        )