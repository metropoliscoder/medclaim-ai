from datetime import datetime

from fastapi import APIRouter

from backend.app.config.settings import (
    get_settings
)

router = APIRouter()

settings = get_settings()


@router.get(
    "/health",
    summary="Health Check"
)
def health_check():

    return {

        "status": "healthy",

        "application": settings.APP_NAME,

        "version": settings.APP_VERSION,

        "timestamp": datetime.utcnow()
    }