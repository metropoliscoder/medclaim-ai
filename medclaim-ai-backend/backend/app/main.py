from fastapi import FastAPI

from backend.app.api.routes.health import (
    router as health_router
)

from backend.app.api.routes.claim import (
    router as claim_router
)
from backend.app.api.routes.jobs import (
    router as jobs_router
)
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(

    title="MedClaim AI",

    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(

    health_router,

    prefix="/api/v1",

    tags=["Health"]
)

app.include_router(

    claim_router,

    prefix="/api/v1/claims",

    tags=["Claims"]
)

app.include_router(

    jobs_router,

    prefix="/api/v1/jobs",

    tags=["Jobs"]
)