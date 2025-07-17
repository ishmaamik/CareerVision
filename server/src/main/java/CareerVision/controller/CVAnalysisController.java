package CareerVision.controller;

import CareerVision.model.CVData;
import CareerVision.model.User;
import CareerVision.repository.CVDataRepository;
import CareerVision.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@RestController
@RequestMapping("/api/cv")
public class CVAnalysisController {

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CVDataRepository cvDataRepository;

    private final RestTemplate restTemplate = new RestTemplate();

    @PostMapping("/analyze/{userId}")
    public ResponseEntity<?> analyzeCV(@PathVariable Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) return ResponseEntity.badRequest().body("User not found");

        User user = userOpt.get();
        Optional<CVData> cvOpt = cvDataRepository.findByUser(user);

        if (cvOpt.isEmpty() || cvOpt.get().getExtractedText() == null) {
            return ResponseEntity.badRequest().body("No extracted resume found for this user.");
        }

        String cvContent = cvOpt.get().getExtractedText();

        String prompt = """
            You are an expert career coach and professional CV reviewer.
            Please analyze the following CV data and RETURN YOUR ANALYSIS STRICTLY in the following JSON format with NO extra text:

            {
              "overall_impression": "<summary>",
              "content_quality": [
                {"section": "Contact Info", "analysis": "<details>"},
                {"section": "Summary", "analysis": "<details>"},
                {"section": "Education", "analysis": "<details>"},
                {"section": "Work Experience", "analysis": "<details>"},
                {"section": "Skills", "analysis": "<details>"},
                {"section": "Certifications", "analysis": "<details>"},
                {"section": "Projects", "analysis": "<details>"}
              ],
              "formatting_structure": "<summary>",
              "language_tone": "<summary>",
              "keyword_optimization": ["<keyword1>", "<keyword2>"],
              "tailoring_suggestions": "<summary>",
              "actionable_recommendations": ["<recommendation1>", "<recommendation2>"]
            }

            Here is the CV data:
            """ + cvContent;

        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + geminiApiKey;

        Map<String, Object> body = Map.of(
                "contents", List.of(Map.of(
                        "parts", List.of(Map.of("text", prompt))
                ))
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<?> request = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);

            List candidates = (List) response.getBody().get("candidates");
            Map candidate = (Map) candidates.get(0);
            Map content = (Map) candidate.get("content");
            List parts = (List) content.get("parts");
            String analysisText = (String) ((Map) parts.get(0)).get("text");

            // Save to DB
            CVData cvData = cvOpt.get();
            cvData.setAnalysisJson(analysisText);
            cvDataRepository.save(cvData);

            return ResponseEntity.ok(Map.of(
                    "status", "success",
                    "analysis", analysisText
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Gemini analysis failed: " + e.getMessage());
        }
    }

    @GetMapping("/analysis/{userId}")
    public ResponseEntity<?> getAnalysis(@PathVariable Long userId) {
        return userRepository.findById(userId)
                .flatMap(user -> cvDataRepository.findByUser(user))
                .map(cvData -> ResponseEntity.ok(Map.of(
                        "status", "success",
                        "analysis", cvData.getAnalysisJson()
                )))
                .orElse(ResponseEntity.badRequest().body(Map.of(
                        "status", "error",
                        "message", "Analysis not found for this user"
                )));
    }
}
