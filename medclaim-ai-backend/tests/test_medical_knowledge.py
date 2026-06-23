from backend.app.services.medical_knowledge_service import MedicalKnowledgeService

service = MedicalKnowledgeService("data/medical/medical_reference.json")
result = service.get_diagnosis_info("Appendicitis")
print(result)