from sqlalchemy import (
    Column,
    DateTime,
    Float,
    Integer,
    String,
    Text
)

from sqlalchemy.sql import func

from .database import Base


class Claim(Base):

    __tablename__ = "claims"

    id = Column(Integer, primary_key=True)

    job_id = Column(String, unique=True, nullable=False)

    patient_name = Column(String)

    hospital_name = Column(String)

    diagnosis = Column(String)

    procedure = Column(String)

    claim_amount = Column(Float)

    status = Column(String)

    decision = Column(String)

    confidence = Column(Float)

    created_at = Column(
        DateTime,
        server_default=func.now()
    )


class ClaimAudit(Base):

    __tablename__ = "claim_audits"

    id = Column(Integer, primary_key=True)

    claim_id = Column(Integer)

    medical_review = Column(Text)

    policy_review = Column(Text)

    ai_reasoning = Column(Text)

    final_decision = Column(Text)

    created_at = Column(
        DateTime,
        server_default=func.now()
    )