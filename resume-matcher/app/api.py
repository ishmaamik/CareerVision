from flask import Blueprint, request, jsonify
import logging
from .core import UniversalEngineeringMatcher
from .schema_models import JobRequirements, CVData, MatchResponse
from pydantic import ValidationError
from .config import settings

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

api_blueprint = Blueprint('api', __name__)
matcher = UniversalEngineeringMatcher()

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

@api_blueprint.route('/match', methods=['POST', 'OPTIONS'])
def match_resume():
    if request.method == 'OPTIONS':
        # Handle preflight request
        response = jsonify({'status': 'preflight'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', '*')
        response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
        return response
    
    try:
        # Log the raw request data for debugging
        logger.debug(f"Received request data: {request.get_json()}")
        
        # Validate input
        data = request.get_json()
        
        # Log the data before validation
        logger.debug(f"Raw job data: {data.get('job', {})}")
        logger.debug(f"Raw resume data: {data.get('resume', {})}")
        
        # Validate and create models
        job = JobRequirements(**data['job'])
        cv = CVData(**data['resume'])
        
        # Log the validated models
        logger.debug(f"Validated Job: {job.model_dump()}")
        logger.debug(f"Validated CV: {cv.model_dump()}")
        
        # Check input size with more detailed logging
        cv_text_length = len(cv.extracted_text)
        if cv_text_length > settings.MAX_INPUT_LENGTH:
            logger.warning(
                f"CV text exceeds maximum length. "
                f"Current length: {cv_text_length}, "
                f"Maximum allowed: {settings.MAX_INPUT_LENGTH}"
            )
            return jsonify({
                "error": f"CV text exceeds maximum length of {settings.MAX_INPUT_LENGTH} characters",
                "current_length": cv_text_length,
                "max_length": settings.MAX_INPUT_LENGTH
            }), 400
        
        # Perform matching
        result = matcher.calculate_universal_match(job, cv)
        
        # Log the result
        logger.debug(f"Match Result: {result.dict()}")
        
        # Return structured response
        response = jsonify(result.dict())
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
        
    except ValidationError as e:
        # Log validation errors with more detail
        logger.error(f"Validation Error: {e}")
        return jsonify({
            "error": "Invalid input data", 
            "details": str(e),
            "validation_errors": e.errors()
        }), 400
    except Exception as e:
        # Log unexpected errors
        logger.error(f"Unexpected Error: {e}", exc_info=True)
        return jsonify({
            "error": "Processing failed", 
            "details": str(e)
        }), 500

@api_blueprint.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy",
        "service": settings.APP_NAME,
        "model": settings.SPACY_MODEL
    })