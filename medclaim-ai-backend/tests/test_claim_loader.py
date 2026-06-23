import json
from backend.app.models.claim import Claim

with open('data/claims/claim_001.json') as file:
    data = json.load(file)

claim = Claim.model_validate(data)

print(claim)