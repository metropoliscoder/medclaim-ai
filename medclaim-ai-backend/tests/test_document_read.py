from backend.app.services.claim_extraction_service import load_document

claim = load_document("data/documents/claim_form_001.txt")

print(claim)