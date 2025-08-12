import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class Config:
    """Application configuration class."""
    
    # Database configuration
    DATABASE_URI = os.getenv('DATABASE_URI', 'sqlite:///app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Backup configuration
    BACKUP_STORAGE_PATH = os.getenv('BACKUP_STORAGE_PATH', '.')
    
    # Flask configuration
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
    
    # CORS configuration for frontend
    CORS_ORIGINS = os.getenv('CORS_ORIGINS', 'http://localhost:3000').split(',')
    
    @staticmethod
    def init_app(app):
        """Initialize Flask app with configuration."""
        app.config['SQLALCHEMY_DATABASE_URI'] = Config.DATABASE_URI
        app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = Config.SQLALCHEMY_TRACK_MODIFICATIONS
        app.config['SECRET_KEY'] = Config.SECRET_KEY
