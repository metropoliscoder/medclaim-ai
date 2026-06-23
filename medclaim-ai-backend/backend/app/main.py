from fastapi import FastAPI

app = FastAPI(
    title='MedClaim AI',
    version="1.0.0"
)

@app.get("/")
def root():

    return {
        "message": "MedClaim AI API Running"
    }