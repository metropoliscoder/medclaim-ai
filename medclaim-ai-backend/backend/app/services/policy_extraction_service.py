import os

from dotenv import load_dotenv
from openai import OpenAI

from backend.app.models.extracted_policy import (
    ExtractedPolicy
)

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)


def extract_policy_information(
    policy_context: str
) -> ExtractedPolicy:

    response = client.responses.parse(
        model="gpt-4.1-mini",

        input=[
            {
                "role": "system",
                "content": """
You are a health insurance policy analysis assistant.

Extract:

- coverage_limit
- covered_procedures
- waiting_period_days
- exclusions

Return structured output only.
"""
            },
            {
                "role": "user",
                "content": policy_context
            }
        ],

        text_format=ExtractedPolicy
    )

    return response.output_parsed