from pydantic import BaseModel

class Treatment(BaseModel):
    diagnosis: str
    procedure_name: str