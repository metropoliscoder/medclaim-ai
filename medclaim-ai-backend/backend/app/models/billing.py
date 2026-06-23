from pydantic import BaseModel

class Billing(BaseModel):
    claim_amount: float