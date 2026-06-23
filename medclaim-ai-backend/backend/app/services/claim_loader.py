import json

from backend.app.models.claim import Claim

class ClaimLoader:
    @staticmethod
    def load_claim(file_path: str) -> Claim:
        with open(file_path) as file:
            data = json.load(file)
        return Claim.model_validate(data)
