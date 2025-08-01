from flask import Blueprint, request, jsonify
from .core import ResumeMatcher
from .schema_models import JobRequirements, CVData, MatchResponse
from pydantic import ValidationError
from .config import settings

api_blueprint = Blueprint('api', __name__)
matcher = ResumeMatcher()

@api_blueprint.route('/', methods=['GET'])
def index():
    return jsonify({
        "service": "Resume Matcher",
        "version": "1.0",
        "available_endpoints": [
            "/health - Health check endpoint",
            "/match - Resume matching endpoint (POST)"
        ]
    })

@api_blueprint.route('/match', methods=['POST', 'OPTIONS'])  # Note: Just '/match' here
def match_resume():
    if request.method == 'OPTIONS':
        # Handle preflight request
        response = jsonify({'status': 'preflight'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', '*')
        response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
        return response
    
    try:
        # Validate input
        data = request.get_json()
        job = JobRequirements(**data['job'])
        cv = CVData(**data['resume'])
        
        # Check input size
        if len(cv.extracted_text) > settings.MAX_INPUT_LENGTH:
            return jsonify({
                "error": f"CV text exceeds maximum length of {settings.MAX_INPUT_LENGTH} characters"
            }), 400
        
        # Perform matching
        result = matcher.calculate_match(job, cv)
        
        # Return structured response
        response = jsonify(result.dict())
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
        
    except ValidationError as e:
        return jsonify({"error": "Invalid input data", "details": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "Processing failed", "details": str(e)}), 500

@api_blueprint.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy",
        "service": settings.APP_NAME,
        "model": settings.SPACY_MODEL
    })