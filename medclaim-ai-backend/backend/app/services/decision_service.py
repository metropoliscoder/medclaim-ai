import os

from dotenv import load_dotenv
from openai import OpenAI

from backend.app.models.final_decision import (
    FinalDecision
)

from backend.app.models.medical_review_result import (
    MedicalReviewResult
)

from backend.app.models.policy_review_result import (
    PolicyReviewResult
)

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

def make_final_decision(
        medical_review: MedicalReviewResult,
        policy_review: PolicyReviewResult
) -> FinalDecision:
    if (
        medical_review.status == "FAIL"
        or
        policy_review.status == "FAIL"
    ):

        decision = "REJECT"

    elif (
        medical_review.confidence < 0.80
        or
        policy_review.confidence < 0.80
    ):

        decision = "NEED_HUMAN_REVIEW"

    else:

        decision = "APPROVE"

    response = client.responses.create(

    model="gpt-4.1-mini",

    input=f"""
        You are an insurance claim decision expert.

        Medical Status:
        {medical_review.status}

        Medical Reasoning:
        {medical_review.reasoning}

        Policy Status:
        {policy_review.status}

        Policy Reasoning:
        {policy_review.reasoning}

        Final Decision:
        {decision}

        Explain the final claim decision in 2-3 sentences.
        """
    )
    return FinalDecision(

        decision=decision,

        medical_status=medical_review.status,

        policy_status=policy_review.status,

        medical_confidence=medical_review.confidence,

        policy_confidence=policy_review.confidence,

        reasoning=response.output_text
    )