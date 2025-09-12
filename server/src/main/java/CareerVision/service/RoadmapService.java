package CareerVision.service;

import CareerVision.dto.RoadmapRequest;
import CareerVision.model.Roadmap;
import CareerVision.model.User;
import CareerVision.repository.RoadmapRepository;
import CareerVision.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class RoadmapService {
    private static final Logger logger = LoggerFactory.getLogger(RoadmapService.class);

    // Detailed fallback roadmap with more context
    private static final String FALLBACK_ROADMAP = """
        # Personalized AI Learning Roadmap

        ## Week 1: Foundations of AI
        - Understand basic AI and machine learning concepts
        - Introduction to Python for AI
        - Set up development environment (Anaconda, Jupyter)
        - Learn basic data manipulation with NumPy and Pandas

        ## Week 2: Machine Learning Basics
        - Explore supervised and unsupervised learning
        - Implement simple linear regression
        - Introduction to scikit-learn
        - Basic data preprocessing techniques

        ## Week 3: Deep Learning Fundamentals
        - Neural network architecture basics
        - Introduction to TensorFlow and Keras
        - Build a simple neural network
        - Understand activation functions and backpropagation

        ## Week 4: Practical AI Project
        - Choose a small AI project (e.g., image classification, sentiment analysis)
        - Data collection and preparation
        - Model training and evaluation
        - Presentation and reflection on learning journey
        """;

    @Autowired
    private RoadmapRepository roadmapRepository;

    @Autowired
    private UserRepository userRepository;

    @Value("${groq.api.key}")
    private String groqApiKey;

    @Transactional
    public Roadmap generateRoadmap(RoadmapRequest request) throws Exception {
        // Validate input
        validateInput(request);

        // Find the user
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Prepare Groq AI prompt
        String prompt = preparePrompt(request);
        logger.info("Generated Roadmap Prompt: {}", prompt);

        // Attempt to generate roadmap content
        String roadmapContent = generateRoadmapContent(prompt, request);

        // Create Roadmap entity
        Roadmap roadmap = createRoadmapEntity(user, request, roadmapContent);

        // Save and return
        return roadmapRepository.save(roadmap);
    }

    private void validateInput(RoadmapRequest request) {
        if (request == null) {
            throw new IllegalArgumentException("Request cannot be null");
        }
        if (request.getUserId() == null) {
            throw new IllegalArgumentException("User ID is required");
        }
        if (request.getPrimaryGoal() == null) {
            throw new IllegalArgumentException("Primary goal is required");
        }
    }

    // Update the preparePrompt method to generate more detailed roadmap
    private String preparePrompt(RoadmapRequest request) {
        // Prepare languages
        String languageNames = request.getLanguages() != null 
            ? request.getLanguages().stream()
                .map(RoadmapRequest.Language::getName)
                .collect(Collectors.joining(", "))
            : "Python";

        // Prepare learning context
        String learningStyle = request.getLearningStyle() != null
            ? request.getLearningStyle()
            : "Interactive";
        
        String difficultyLevel = request.getDifficulty() != null
            ? request.getDifficulty()
            : "Fundamentals";

        // Prepare time commitment
        String timeCommitment = request.getHoursPerWeek() != null 
            ? request.getHoursPerWeek() + " hours per week at a " + 
              (request.getPace() != null ? request.getPace() : "moderate") + " pace"
            : "15-20 hours per week at an intensive pace";

        // Prepare experience context
        String experienceContext = request.getExperienceDescription() != null
            ? request.getExperienceDescription()
            : "Complete beginner with no prior programming or AI experience";

        // Prepare specific tools or project context
        String toolsContext = request.getTools() != null && !request.getTools().trim().isEmpty()
            ? "Specific tools or projects of interest: " + request.getTools()
            : "Open to exploring cutting-edge AI and machine learning tools";

        // Comprehensive prompt with extremely detailed instructions
        return String.format(
            "Create an ULTRA-COMPREHENSIVE and PROGRESSIVELY CHALLENGING 4-week AI learning roadmap for a learner focusing on %s. " +
            "This roadmap must be an EXHAUSTIVE, METICULOUSLY CRAFTED learning journey that transforms a complete novice into a competent AI practitioner.\n\n" +
            "LEARNING PROFILE:\n" +
            "- Primary Goal: %s\n" +
            "- Specific Area of Interest: %s\n" +
            "- Experience Level: %s\n" +
            "- Learning Approach: %s learner\n" +
            "- Difficulty Trajectory: %s\n" +
            "- Time Investment: %s\n" +
            "- Additional Context: %s\n\n" +
            "ROADMAP GENERATION REQUIREMENTS:\n" +
            "1. WEEK-BY-WEEK PROGRESSION:\n" +
            "   - Week 1: FOUNDATIONS (Building Fundamental Knowledge)\n" +
            "     * Introduce core concepts with EXTREME DEPTH\n" +
            "     * Provide multiple learning resources for each concept\n" +
            "     * Include beginner-friendly but comprehensive exercises\n" +
            "     * Create a 'Concept Mapping' activity to connect ideas\n" +
            "\n" +
            "   - Week 2: SKILL BUILDING (Practical Application)\n" +
            "     * Introduce more complex concepts\n" +
            "     * Include hands-on coding projects\n" +
            "     * Implement real-world problem-solving scenarios\n" +
            "     * Add complexity to previous week's foundational knowledge\n" +
            "\n" +
            "   - Week 3: ADVANCED TECHNIQUES (Deep Dive)\n" +
            "     * Introduce advanced AI/ML concepts\n" +
            "     * Implement more sophisticated projects\n" +
            "     * Include theoretical and practical components\n" +
            "     * Introduce cutting-edge research and techniques\n" +
            "\n" +
            "   - Week 4: SPECIALIZATION & INTEGRATION (Capstone Project)\n" +
            "     * Create a comprehensive project integrating all learned skills\n" +
            "     * Provide guidance on potential specialization paths\n" +
            "     * Include professional development and portfolio building tips\n" +
            "     * Prepare learner for advanced learning or entry-level positions\n\n" +
            "2. COMPREHENSIVE RESOURCE RECOMMENDATIONS:\n" +
            "   - Academic Resources:\n" +
            "     * Peer-reviewed research papers\n" +
            "     * University-level lecture notes\n" +
            "     * Advanced online courses\n" +
            "   - Practical Resources:\n" +
            "     * Coding tutorials\n" +
            "     * Interactive coding platforms\n" +
            "     * Real-world project templates\n" +
            "   - Community & Networking:\n" +
            "     * AI/ML forums\n" +
            "     * GitHub project recommendations\n" +
            "     * Professional networking strategies\n\n" +
            "3. DETAILED DAILY LEARNING OBJECTIVES:\n" +
            "   - Specific, measurable learning outcomes\n" +
            "   - Time-boxed learning activities\n" +
            "   - Self-assessment checkpoints\n" +
            "   - Error handling and debugging techniques\n\n" +
            "4. ADVANCED LEARNING STRATEGIES:\n" +
            "   - Metacognitive learning techniques\n" +
            "   - Spaced repetition methods\n" +
            "   - Critical thinking development\n" +
            "   - Problem-solving skill enhancement\n\n" +
            "5. TECHNICAL DEPTH REQUIREMENTS:\n" +
            "   - Provide code examples for EVERY major concept\n" +
            "   - Include mathematical foundations\n" +
            "   - Explain theoretical underpinnings\n" +
            "   - Compare and contrast different approaches\n\n" +
            "6. PROGRESS TRACKING & MOTIVATION:\n" +
            "   - Daily and weekly progress tracking sheets\n" +
            "   - Motivation techniques\n" +
            "   - Overcoming learning plateaus\n" +
            "   - Mental health and learning sustainability tips\n\n" +
            "FORMAT SPECIFICATIONS:\n" +
            "- Use markdown with EXTENSIVE formatting\n" +
            "- Include emoji for visual engagement 🚀\n" +
            "- Create visually appealing and informative layout\n" +
            "- Use headings, subheadings, and clear sections\n" +
            "- Include diagrams and visual explanations where possible\n\n" +
            "CRITICAL INSTRUCTIONS:\n" +
            "- ABSOLUTELY NO GENERIC OR SURFACE-LEVEL CONTENT\n" +
            "- PROVIDE HYPER-SPECIFIC, ACTIONABLE GUIDANCE\n" +
            "- ENSURE PROGRESSIVE COMPLEXITY AND CHALLENGE\n" +
            "- MAKE LEARNING PATH BOTH RIGOROUS AND ENGAGING\n\n" +
            "FINAL OBJECTIVE:\n" +
            "Transform the learner from a complete novice to a confident, skilled AI practitioner in just 4 weeks, " +
            "providing a learning experience that is simultaneously comprehensive, challenging, and inspirational.",
            languageNames,
            request.getPrimaryGoal() != null ? request.getPrimaryGoal() : "Mastering AI",
            request.getSpecificArea() != null ? request.getSpecificArea() : "Machine Learning and Artificial Intelligence",
            experienceContext,
            learningStyle,
            difficultyLevel,
            timeCommitment,
            toolsContext
        );
    }

    // Enhanced goal context extraction method
    private String extractPreciseGoalContext(RoadmapRequest request) {
        // Collect all possible context sources
        List<String> contextSources = new ArrayList<>();
        
        // Add goals if present
        if (request.getPrimaryGoal() != null) {
            contextSources.add(request.getPrimaryGoal().toLowerCase());
        }
        if (request.getSpecificArea() != null) {
            contextSources.add(request.getSpecificArea().toLowerCase());
        }
        
        // Add tools if present
        if (request.getTools() != null && !request.getTools().trim().isEmpty()) {
            contextSources.add(request.getTools().toLowerCase());
        }
        
        // Add experience description if present
        if (request.getExperienceDescription() != null) {
            contextSources.add(request.getExperienceDescription().toLowerCase());
        }
        
        // Combine and analyze context
        String combinedContext = String.join(" ", contextSources);
        
        // Detailed keyword matching
        Map<String, List<String>> domainKeywords = new HashMap<>() {{
            put("web", Arrays.asList("web", "frontend", "backend", "html", "css", "javascript", "react", "angular", "vue", "node", "express", "django", "flask"));
            put("mobile", Arrays.asList("mobile", "android", "ios", "swift", "kotlin", "java", "mobile app", "app development"));
            put("data", Arrays.asList("data", "machine learning", "ai", "python", "numpy", "pandas", "tensorflow", "keras", "data science", "ml", "artificial intelligence"));
            put("cloud", Arrays.asList("cloud", "aws", "azure", "google cloud", "kubernetes", "docker", "devops"));
            put("cybersecurity", Arrays.asList("security", "cybersecurity", "network", "penetration", "ethical hacking", "infosec"));
            put("game", Arrays.asList("game", "unity", "unreal", "game development", "gamedev"));
        }};
        
        // Prioritize domain matching
        for (Map.Entry<String, List<String>> entry : domainKeywords.entrySet()) {
            for (String keyword : entry.getValue()) {
                if (combinedContext.contains(keyword)) {
                    return entry.getKey();
                }
            }
        }
        
        // Fallback to more generic categorization
        if (combinedContext.contains("programming") || combinedContext.contains("code")) {
            return "software";
        }
        
        if (combinedContext.contains("design") || combinedContext.contains("ux") || combinedContext.contains("ui")) {
            return "design";
        }
        
        // Ultimate fallback
        return "technology";
    }

    private String generateDynamicFallbackRoadmap(RoadmapRequest request) {
        // Extract precise goal context
        String goalContext = extractPreciseGoalContext(request);
        
        logger.info("Extracted Goal Context: {}", goalContext);
        
        switch (goalContext) {
            case "web":
                return """
                # Personalized Web Development Learning Roadmap

                ## Week 1: Web Development Foundations
                - HTML5 and CSS3 fundamentals
                - Responsive web design principles
                - Introduction to JavaScript and DOM manipulation
                - Setting up development environment (VS Code, Git)
                - Basic website structure and styling techniques

                ## Week 2: Frontend Frameworks and Interactivity
                - Advanced JavaScript (ES6+) concepts
                - Introduction to React.js or Vue.js
                - State management with Redux or Context API
                - Building interactive user interfaces
                - Responsive design and CSS frameworks (Tailwind, Bootstrap)

                ## Week 3: Backend Development and APIs
                - Introduction to Node.js and Express.js
                - RESTful API design principles
                - Database integration (MongoDB or PostgreSQL)
                - Authentication and security fundamentals
                - Connecting frontend with backend services

                ## Week 4: Full-Stack Project and Deployment
                - Develop a complete full-stack web application
                - Implement user authentication and authorization
                - Create CRUD functionality
                - Deploy application to cloud platform (Heroku, Netlify)
                - Build professional portfolio project
                - Prepare for technical interviews
                """;
            
            case "mobile":
                return """
                # Personalized Mobile App Development Learning Roadmap

                ## Week 1: Mobile Development Foundations
                - Choose mobile platform (Android or iOS)
                - Programming language basics (Kotlin/Java for Android, Swift for iOS)
                - Mobile development environment setup
                - User interface design principles
                - Introduction to mobile app architecture

                ## Week 2: User Interface and Basic Functionality
                - Building responsive mobile interfaces
                - State management in mobile apps
                - Local data storage techniques
                - Implementing basic app navigation
                - Understanding mobile design guidelines

                ## Week 3: Advanced Mobile Development
                - Network communication and API integration
                - Advanced UI/UX design techniques
                - Performance optimization
                - Mobile app security fundamentals
                - Implementing background services

                ## Week 4: Practical Mobile App Project
                - Develop a complete mobile application
                - Implement core features and user authentication
                - Add advanced features (maps, notifications)
                - Prepare for app store submission
                - Create comprehensive project portfolio
                """;
            
            case "data":
                return """
                # Personalized Data Science and Machine Learning Roadmap

                ## Week 1: Python and Data Foundations
                - Python programming fundamentals
                - Jupyter Notebook and development environment setup
                - NumPy for numerical computing
                - Pandas for data manipulation
                - Basic data visualization with Matplotlib

                ## Week 2: Data Analysis and Preprocessing
                - Advanced Pandas data manipulation
                - Data cleaning and preprocessing techniques
                - Exploratory data analysis
                - Statistical analysis basics
                - Advanced visualization with Seaborn

                ## Week 3: Machine Learning Fundamentals
                - Introduction to scikit-learn
                - Supervised and unsupervised learning algorithms
                - Model evaluation and validation techniques
                - Feature engineering
                - Hyperparameter tuning

                ## Week 4: Practical Machine Learning Project
                - Choose and prepare a real-world dataset
                - Implement end-to-end machine learning project
                - Build predictive models
                - Create data visualization dashboard
                - Prepare project presentation and portfolio
                """;
            
            case "cloud":
                return """
                # Personalized Cloud Computing and DevOps Learning Roadmap

                ## Week 1: Cloud Foundations
                - Cloud computing concepts
                - Introduction to major cloud platforms (AWS, Azure, GCP)
                - Basic networking and infrastructure
                - Cloud service models (IaaS, PaaS, SaaS)
                - Setting up cloud development environment

                ## Week 2: Cloud Services and Deployment
                - Compute services
                - Storage solutions
                - Database services
                - Serverless computing basics
                - Basic cloud security principles

                ## Week 3: DevOps and Automation
                - Introduction to Docker and containerization
                - Kubernetes fundamentals
                - Continuous Integration/Continuous Deployment (CI/CD)
                - Infrastructure as Code (Terraform)
                - Monitoring and logging

                ## Week 4: Practical Cloud Project
                - Design and deploy a cloud-native application
                - Implement microservices architecture
                - Set up CI/CD pipeline
                - Configure monitoring and logging
                - Create professional cloud portfolio project
                """;
            
            case "cybersecurity":
                return """
                # Personalized Cybersecurity Learning Roadmap

                ## Week 1: Cybersecurity Foundations
                - Information security principles
                - Networking fundamentals
                - Operating system security
                - Basic cryptography
                - Introduction to ethical hacking concepts

                ## Week 2: Network and System Security
                - Network security protocols
                - Firewall and intrusion detection
                - Vulnerability assessment
                - Basic penetration testing techniques
                - Security tools and frameworks

                ## Week 3: Advanced Security Techniques
                - Web application security
                - Malware analysis
                - Incident response
                - Forensic techniques
                - Social engineering awareness

                ## Week 4: Practical Cybersecurity Project
                - Set up secure home lab
                - Conduct vulnerability assessment
                - Develop security policy
                - Create incident response plan
                - Prepare for cybersecurity certifications
                """;
            
            case "game":
                return """
                # Personalized Game Development Learning Roadmap

                ## Week 1: Game Development Foundations
                - Game design principles
                - Introduction to game engines (Unity or Unreal)
                - Basic programming for game development
                - 2D and 3D game concepts
                - Game asset creation basics

                ## Week 2: Game Mechanics and Programming
                - Advanced game programming techniques
                - Physics and collision detection
                - User input and interaction
                - Game state management
                - Basic AI for games

                ## Week 3: Advanced Game Development
                - Advanced 3D game development
                - Multiplayer game concepts
                - Performance optimization
                - Advanced shader programming
                - Game audio and visual effects

                ## Week 4: Complete Game Project
                - Design and develop a complete game
                - Implement core game mechanics
                - Create game assets
                - Optimize performance
                - Prepare game for distribution
                """;
            
            default:
                return """
                # Personalized Technology Learning Roadmap

                ## Week 1: Technology Exploration
                - Explore various technology domains
                - Identify personal interests and strengths
                - Basic digital literacy skills
                - Online learning resources discovery
                - Goal setting and learning strategy development

                ## Week 2: Skill Foundation
                - Introduction to programming concepts
                - Basic problem-solving techniques
                - Online course exploration
                - Personal project ideation
                - Technology skill assessment

                ## Week 3: Advanced Learning
                - Deep dive into chosen technology area
                - Advanced learning resources
                - Community engagement
                - Practical skill application
                - Professional development basics

                ## Week 4: Project and Future Planning
                - Develop a personal technology project
                - Create online portfolio
                - Networking and professional connections
                - Reflection on learning journey
                - Future learning and career planning
                """;
        }
    }

    private String generateRoadmapContent(String prompt, RoadmapRequest request) {
        try {
            String content = callGroqAPI(prompt);
            
            // Validate content
            if (content == null || content.trim().isEmpty() || 
                content.toLowerCase().contains("placeholder")) {
                logger.warn("Generated content is empty or contains placeholder. Using dynamic fallback.");
                return generateDynamicFallbackRoadmap(request);
            }
            
            // Additional validation to ensure meaningful content
            if (content.length() < 500) {  // Minimum length to ensure substantive roadmap
                logger.warn("Generated content is too short. Using dynamic fallback.");
                return generateDynamicFallbackRoadmap(request);
            }
            
            return content;
        } catch (Exception e) {
            logger.error("Failed to generate roadmap via Groq API. Using dynamic fallback.", e);
            return generateDynamicFallbackRoadmap(request);
        }
    }

    private Roadmap createRoadmapEntity(User user, RoadmapRequest request, String roadmapContent) {
        Roadmap roadmap = new Roadmap();
        roadmap.setUser(user);
        
        // Set goals
        roadmap.setPrimaryGoal(request.getPrimaryGoal());
        roadmap.setSpecificArea(request.getSpecificArea());

        // Set experience
        roadmap.setSelfAssessment(request.getSelfAssessment());
        roadmap.setExperienceDescription(request.getExperienceDescription());

        // Set time commitment
        roadmap.setHoursPerWeek(request.getHoursPerWeek());
        roadmap.setPace(request.getPace());

        // Set preferences
        roadmap.setLearningStyle(request.getLearningStyle());
        roadmap.setDifficulty(request.getDifficulty());

        // Set languages
        roadmap.setLanguages(
            request.getLanguages() != null ?
            request.getLanguages().stream()
                .map(lang -> {
                    Roadmap.Language mapLang = new Roadmap.Language();
                    mapLang.setName(lang.getName());
                    mapLang.setPriority(lang.getPriority());
                    return mapLang;
                })
                .collect(Collectors.toList()) :
            null
        );

        // Set additional fields
        roadmap.setTools(request.getTools());
        roadmap.setAgeRange(request.getAgeRange());
        roadmap.setStatus(request.getStatus());
        roadmap.setFeedback(request.getFeedback());

        // Set generated roadmap
        roadmap.setGeneratedRoadmap(roadmapContent);

        return roadmap;
    }

    private String escapeJsonString(String input) {
        if (input == null) return "";
        return input
            .replace("\\", "\\\\")  // Escape backslashes first
            .replace("\"", "\\\"")  // Escape double quotes
            .replace("\n", "\\n")   // Escape newlines
            .replace("\r", "\\r")   // Escape carriage returns
            .replace("\t", "\\t");  // Escape tabs
    }

    private String callGroqAPI(String prompt) throws Exception {
        try {
            // Prepare HTTP client
            HttpClient client = HttpClient.newHttpClient();
            ObjectMapper objectMapper = new ObjectMapper();

            // Escape the prompt to prevent JSON parsing errors
            String escapedPrompt = escapeJsonString(prompt);

            // Prepare request body
            String requestBody = String.format(
                "{\"messages\": [{\"role\": \"user\", \"content\": \"%s\"}], " +
                "\"model\": \"llama-3.3-70b-versatile\", " +
                "\"temperature\": 0.7, " +
                "\"max_tokens\": 2000}",
                escapedPrompt
            );

            logger.debug("Escaped Prompt: {}", escapedPrompt);
            logger.debug("Request Body: {}", requestBody);

            // Create HTTP request
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.groq.com/openai/v1/chat/completions"))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + groqApiKey)
                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                .build();

            // Send request and get response
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            // Log full response for debugging
            logger.info("Groq API Response Status: {}", response.statusCode());
            logger.debug("Groq API Full Response: {}", response.body());

            // Check response status
            if (response.statusCode() != 200) {
                logger.error("Groq API Error Response: {}", response.body());
                throw new RuntimeException("Groq API Error: " + response.body());
            }

            // Parse JSON response
            JsonNode rootNode = objectMapper.readTree(response.body());
            JsonNode choicesNode = rootNode.path("choices");
            
            if (choicesNode.isArray() && choicesNode.size() > 0) {
                JsonNode messageNode = choicesNode.get(0).path("message");
                String roadmapContent = messageNode.path("content").asText();

                // Validate roadmap content
                if (roadmapContent == null || roadmapContent.trim().isEmpty()) {
                    logger.warn("Groq API returned empty content");
                    throw new RuntimeException("Empty roadmap content from Groq API");
                }

                logger.info("Extracted Roadmap Content: {}", roadmapContent);
                return roadmapContent;
            } else {
                logger.error("No choices found in Groq API response");
                throw new RuntimeException("No roadmap content found in Groq API response");
            }
        } catch (IOException | InterruptedException e) {
            logger.error("Error calling Groq API", e);
            throw new RuntimeException("Failed to generate roadmap: " + e.getMessage(), e);
        }
    }

    public java.util.List<Roadmap> getRoadmapsByUserId(Long userId) {
        return roadmapRepository.findByUserId(userId);
    }

    public Roadmap getRoadmapById(Long id) {
        return roadmapRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Roadmap not found"));
    }
}