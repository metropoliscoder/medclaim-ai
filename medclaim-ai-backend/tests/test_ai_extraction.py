from backend.app.services.claim_extraction_service import load_document, extract_claim_from_text

claim_text= load_document("data/documents/claim_form_001.txt")

claim_form = load_document(
    "data/documents/claim_form_001.txt"
)

discharge_summary = load_document(
    "data/documents/discharge_summary_001.txt"
)

combined_text = f"""
CLAIM FORM

{claim_form}

DISCHARGE SUMMARY

{discharge_summary}
"""

result = extract_claim_from_text(
    combined_text
)

print(result)