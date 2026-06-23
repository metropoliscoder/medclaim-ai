from backend.app.services.claim_extraction_service import load_document, extract_claim_from_text
from backend.app.services.claim_mapper import ClaimMapper
from backend.app.services.medical_knowledge_service import MedicalKnowledgeService
from backend.app.services.medical_review_service import (
    review_claim
)


document = load_document("data/documents/claim_form_001.txt")
discharge_summary = load_document("data/documents/discharge_summary_001.txt")

combined_text = f"""
claim form:
{document}
discharge summary:
{discharge_summary}
"""

extracted_claim = extract_claim_from_text(combined_text)

print("\n===== EXTRACTED CLAIM =====")

print(extracted_claim)

claim = ClaimMapper.to_claim(extracted_claim)

print("\n===== CLAIM OBJECT =====")
print(claim)

knowledge_service = MedicalKnowledgeService("data/medical/medical_reference.json")


diagnosis_info = (
    knowledge_service.get_diagnosis_info(claim.treatment.diagnosis)
)

print("\n===== DIAGNOSIS INFO =====")
print(diagnosis_info)


medical_review = review_claim(
    claim,
    diagnosis_info
)

print("\n===== MEDICAL REVIEW =====")
print(medical_review)