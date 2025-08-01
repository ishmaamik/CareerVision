from flask import Flask
from flask_cors import CORS
from app.api import api_blueprint
from app.config import settings

app = Flask(__name__)

# Configure CORS
if settings.CORS_ENABLED:
    CORS(app, resources={
        r"/api/v1/*": {
            "origins": settings.CORS_ORIGINS
        }
    })

# Register blueprint with prefix
app.register_blueprint(api_blueprint, url_prefix=settings.API_PREFIX)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=settings.DEBUG)
