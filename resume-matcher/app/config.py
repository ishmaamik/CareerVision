import os
from pydantic import BaseSettings

class Settings(BaseSettings):
    # Service Configuration
    APP_NAME: str = "Resume Matcher API"
    API_PREFIX: str = "/api/v1"
    DEBUG: bool = os.getenv("DEBUG", "false").lower() == "true"
    
    # Matching Algorithm
    SKILL_MATCH_WEIGHT: float = 0.4
    KEYWORD_MATCH_WEIGHT: float = 0.3
    EXPERIENCE_MATCH_WEIGHT: float = 0.3
    MIN_MATCH_PERCENTAGE: float = 0.7
    
    # NLP Configuration
    SPACY_MODEL: str = "en_core_web_sm"
    MAX_INPUT_LENGTH: int = 10000  # characters
    
    # CORS Configuration
    CORS_ENABLED: bool = True
    CORS_ORIGINS: list = [
        "http://localhost:8080",  # Spring Boot
        "http://localhost:5173"   # React
    ]
    
    class Config:
        env_file = ".env"

settings = Settings()