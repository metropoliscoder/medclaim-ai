import json

class MedicalKnowledgeService:
    def __init__(self,knowledge_file:str):
        with open(knowledge_file) as file:
            self.knowledge_base = json.load(file)

    def get_diagnosis_info(self, diagnosis: str):
        return self.knowledge_base.get(diagnosis)