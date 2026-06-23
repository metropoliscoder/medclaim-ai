from pydantic import BaseModel


class PolicyReviewResult(BaseModel):

    status: str
    confidence: float
    covered: bool
    procedure: str
    claim_amount: float
    coverage_limit: float
    waiting_period_days: int
    reasoning: str