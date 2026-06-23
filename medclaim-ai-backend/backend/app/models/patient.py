from pydantic import BaseModel

class Patient(BaseModel):
    patient_id: str
    full_name: str
    age: int
    gender: str