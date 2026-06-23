from backend.app.services.audit_service import (
    AuditService
)

audit_service = AuditService()

record = audit_service.create_and_save_audit_record(
    claim,
    medical_review,
    policy_review,
    final_decision
)

print()

print("===== AUDIT RECORD =====")

print()

print(record)