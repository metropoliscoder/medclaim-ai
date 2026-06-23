import os

from dotenv import load_dotenv
from openai import OpenAI
from backend.app.models.extracted_claim import ExtractedClaim

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

def load_document(file_path: str) -> str:
    with open(file_path, "r") as file:
        return file.read()
    

def extract_claim_from_text(
    text: str
) -> ExtractedClaim:

    response = client.responses.parse(
        model="gpt-4.1-mini",

        input=[
            {
                "role": "system",
                "content": """
                    You are a healthcare insurance claim extraction assistant.

                    Extract:
                        - patient_name
                        - patient_id
                        - age
                        - gender
                        - hospital_name
                        - city
                        - diagnosis
                        - procedure
                        - policy_number
                        - policy_type
                        - claim_amount

                        Use information from all provided documents.

                    Return structured data only.
                    """
            },
            {
                "role": "user",
                "content": text
            }
        ],

        text_format=ExtractedClaim
    )

    return response.output_parsed