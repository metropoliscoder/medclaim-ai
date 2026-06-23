from backend.app.models.patient import Patient

patient = Patient(
    patient_id="P001",
    full_name="Shorabh Chobey",
    age=30,
    gender="Male"
)

print(patient)