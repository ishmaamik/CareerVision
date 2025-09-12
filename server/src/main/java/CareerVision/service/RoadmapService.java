package CareerVision.service;

import CareerVision.dto.RoadmapRequest;
import CareerVision.model.*;
import CareerVision.repository.RoadmapRepository;
import CareerVision.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Map;
import java.util.HashMap;

@Service
public class RoadmapService {

    @Autowired
    private RoadmapRepository roadmapRepository;

    @Autowired
    private UserRepository userRepository;

    @Value("${groq.api.key}")
    private String groqApiKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public Roadmap generateRoadmap(RoadmapRequest request) throws Exception {
        // Verify user exists
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Generate roadmap content using Groq AI
        String roadmapContent = generateRoadmapWithGroq(request);

        // Convert selfAssessment list to comma-separated string
        String selfAssessmentStr = request.getSelfAssessment() != null ?
                String.join(", ", request.getSelfAssessment()) : "";

        // Create roadmap entity with direct field mapping
        Roadmap roadmap = Roadmap.builder()
                .user(user)
                .primaryGoal(request.getPrimaryGoal())
                .specificArea(request.getSpecificArea())
                .selfAssessment(selfAssessmentStr)
                .experienceDescription(request.getExperienceDescription())
                .hoursPerWeek(request.getHoursPerWeek())
                .pace(request.getPace())
                .learningStyle(request.getLearningStyle())
                .difficulty(request.getDifficulty())
                .generatedRoadmap(roadmapContent)
                .build();

        // Save roadmap first to get ID
        Roadmap savedRoadmap = roadmapRepository.save(roadmap);

        // Create and save languages
        List<Language> languages = request.getLanguages().stream()
                .map(langDto -> Language.builder()
                        .name(langDto.getName())
                        .priority(langDto.getPriority())
                        .roadmap(savedRoadmap)
                        .build())
                .collect(Collectors.toList());

        roadmap.setLanguages(languages);

        return roadmapRepository.save(roadmap);
    }

    private String generateRoadmapWithGroq(RoadmapRequest request) throws Exception {
        String languageNames = request.getLanguages().stream()
                .map(RoadmapRequest.LanguageDto::getName)
                .collect(Collectors.joining(", "));

        String prompt = String.format(
                "Create a 4-week learning roadmap for %s focusing on %s. " +
                        "User experience: %s. " +
                        "Format: A human-readable string with weekly topics, projects, and resources, using bullet points.",
                languageNames,
                request.getSpecificArea(),
                request.getExperienceDescription()
        );

        // Prepare request body for Groq API
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "llama-3.3-70b-versatile");
        requestBody.put("temperature", 0.9);
        requestBody.put("messages", List.of(
                Map.of("role", "user", "content", prompt)
        ));

        // Set headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(groqApiKey);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        // Make API call
        ResponseEntity<String> response = restTemplate.postForEntity(
                "https://api.groq.com/openai/v1/chat/completions",
                entity,
                String.class
        );

        // Parse response
        JsonNode responseJson = objectMapper.readTree(response.getBody());
        return responseJson.path("choices").get(0).path("message").path("content").asText();
    }

    public List<Roadmap> getRoadmapsByUserId(Long userId) {
        return roadmapRepository.findByUserIdWithLanguages(userId);
    }

    public Roadmap getRoadmapById(Long id) {
        return roadmapRepository.findByIdWithLanguages(id)
                .orElseThrow(() -> new RuntimeException("Roadmap not found"));
    }
}