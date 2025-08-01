from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)  # Enable CORS for all routes
    
    # Import and register blueprints
    from .api import api_blueprint
    app.register_blueprint(api_blueprint)
    
    # Add a debug route to list all endpoints
    @app.route('/debug-routes')
    def debug_routes():
        routes = []
        for rule in app.url_map.iter_rules():
            routes.append({
                'endpoint': rule.endpoint,
                'methods': sorted(rule.methods),
                'path': str(rule)
            })
        return jsonify({'routes': routes})
    
    return app