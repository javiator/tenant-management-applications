from flask import Flask, send_from_directory
from flask_cors import CORS
from .config import Config
from .models import db
from .routes import api
from .swagger import swagger_bp
from pathlib import Path

def create_app(config_class=Config):
    """Application factory pattern for creating Flask app."""
    app = Flask(__name__)
    
    # Initialize configuration
    config_class.init_app(app)
    
    # Initialize extensions
    db.init_app(app)
    
    # Enable CORS for frontend
    CORS(app, origins=Config.CORS_ORIGINS)
    
    # Register blueprints
    app.register_blueprint(api)
    app.register_blueprint(swagger_bp)

    # Serve the OpenAPI yaml at /openapi.yaml
    @app.route('/openapi.yaml')
    def openapi_spec():
        backend_dir = Path(__file__).resolve().parent
        return send_from_directory(backend_dir, 'openapi.yaml', mimetype='application/yaml')
    
    # Create database tables
    with app.app_context():
        db.create_all()
    
    return app
