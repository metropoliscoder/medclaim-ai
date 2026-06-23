import os

from dotenv import load_dotenv
from openai import OpenAI

from backend.app.models.claim import Claim
from backend.app.models.medical_review_result import (
    MedicalReviewResult
)

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

def review_claim(claim: Claim, diagnosis_info: dict) -> MedicalReviewResult:
    expected_procedures = (
        diagnosis_info["procedures"]
    )
    knowledge_match = (
        claim.treatment.procedure_name
        in expected_procedures
    )
    status = (
        "PASS"
        if knowledge_match
        else "FAIL"
    )
    confidence = (
        0.95
        if knowledge_match
        else 0.90
    )
    response = client.responses.create(
        model="gpt-4.1-mini",

        input=f"""
            You are a healthcare medical reviewer.

            Diagnosis:
            {claim.treatment.diagnosis}

            Procedure:
            {claim.treatment.procedure_name}

            Expected Procedures:
            {expected_procedures}

            Knowledge Match:
            {knowledge_match}

            Explain the medical review decision in 2-3 sentences.
            """
    )
    return MedicalReviewResult(
        status=status,
        confidence=confidence,
        diagnosis=claim.treatment.diagnosis,
        procedure=claim.treatment.procedure_name,
        knowledge_match=knowledge_match,
        reasoning=response.output_text
    )