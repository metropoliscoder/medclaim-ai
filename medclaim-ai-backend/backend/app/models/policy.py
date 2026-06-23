from pydantic import BaseModel

class Policy(BaseModel):
    policy_number: str
    policy_type: str
    coverage_limit: float