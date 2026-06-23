from pydantic import BaseModel


class ExtractedPolicy(BaseModel):

    coverage_limit: float

    covered_procedures: list[str]

    waiting_period_days: int

    exclusions: list[str]