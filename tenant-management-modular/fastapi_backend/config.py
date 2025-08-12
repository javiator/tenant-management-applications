import os
from typing import List
from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv()

class Settings(BaseSettings):
    DATABASE_URI: str = os.getenv("DATABASE_URI", "sqlite:///app.db")
    BACKUP_STORAGE_PATH: str = os.getenv("BACKUP_STORAGE_PATH", ".")
    CORS_ORIGINS: List[str] = [o.strip() for o in os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")]

    @property
    def app_root(self) -> str:
        # tenant-management-modular directory
        return os.path.abspath(os.path.join(os.path.dirname(__file__), os.pardir))

    @property
    def instance_dir(self) -> str:
        return os.path.join(self.app_root, "instance")

    @property
    def resolved_sqlite_path(self) -> str:
        """Resolve the absolute sqlite file path following Flask instance convention."""
        if self.DATABASE_URI.startswith("sqlite:///"):
            filename = self.DATABASE_URI.replace("sqlite:///", "")
            # ensure instance directory exists
            os.makedirs(self.instance_dir, exist_ok=True)
            abs_path = filename if os.path.isabs(filename) else os.path.join(self.instance_dir, filename)
            return abs_path
        return ""

    @property
    def sqlalchemy_url(self) -> str:
        if self.DATABASE_URI.startswith("sqlite:///"):
            return f"sqlite:///{self.resolved_sqlite_path}"
        return self.DATABASE_URI

settings = Settings()
