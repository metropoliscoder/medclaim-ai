from functools import lru_cache

from pydantic_settings import BaseSettings


class Settings(BaseSettings):

    # -------------------
    # OpenAI
    # -------------------

    OPENAI_API_KEY: str

    # -------------------
    # Pinecone
    # -------------------

    PINECONE_API_KEY: str

    PINECONE_INDEX_NAME: str

    # -------------------
    # Application
    # -------------------

    APP_NAME: str = "MedClaim AI"

    APP_VERSION: str = "1.0.0"

    DEBUG: bool = True

    # -------------------
    # Uploads
    # -------------------

    UPLOAD_FOLDER: str = "uploads"

    MAX_FILE_SIZE: int = 10 * 1024 * 1024

    class Config:

        env_file = ".env"


@lru_cache
def get_settings():

    return Settings()