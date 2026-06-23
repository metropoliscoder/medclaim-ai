from backend.app.services.claim_loader import ClaimLoader

claim = ClaimLoader.load_claim('data/claims/claim_001.json')

print(claim.patient.full_name)
print(claim.treatment.diagnosis)