package CareerVision.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.*;

@RestController
@RequestMapping("/api/cv")
@CrossOrigin(origins = "*")
public class CVAnalysisController {

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    @PostMapping("/analyze")
    public ResponseEntity<?> analyzeCV(@RequestBody Map<String, Object> cvData) {

        String cvContent = cvData.toString();

        String prompt =
                "You are an expert career coach and professional CV reviewer.\n\n" +
                        "Please analyze the following CV data and RETURN YOUR ANALYSIS STRICTLY in the following JSON format with NO extra text:\n\n" +
                        "{\n" +
                        "  \"overall_impression\": \"<summary>\",\n" +
                        "  \"content_quality\": [\n" +
                        "    {\"section\": \"Contact Info\", \"analysis\": \"<details>\"},\n" +
                        "    {\"section\": \"Summary\", \"analysis\": \"<details>\"},\n" +
                        "    {\"section\": \"Education\", \"analysis\": \"<details>\"},\n" +
                        "    {\"section\": \"Work Experience\", \"analysis\": \"<details>\"},\n" +
                        "    {\"section\": \"Skills\", \"analysis\": \"<details>\"},\n" +
                        "    {\"section\": \"Certifications\", \"analysis\": \"<details>\"},\n" +
                        "    {\"section\": \"Projects\", \"analysis\": \"<details>\"}\n" +
                        "  ],\n" +
                        "  \"formatting_structure\": \"<summary>\",\n" +
                        "  \"language_tone\": \"<summary>\",\n" +
                        "  \"keyword_optimization\": [\"<keyword1>\", \"<keyword2>\", \"...\"],\n" +
                        "  \"tailoring_suggestions\": \"<summary>\",\n" +
                        "  \"actionable_recommendations\": [\"<recommendation1>\", \"<recommendation2>\", \"...\"]\n" +
                        "}\n\n" +
                        "Make sure:\n" +
                        "- Use clear, practical, and constructive language.\n" +
                        "- Tailor suggestions for backend/software developer positions.\n" +
                        "- Do NOT add any text outside the JSON.\n\n" +
                        "Here is the CV data:\n\n" +
                        cvContent;

        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + geminiApiKey;

        Map<String, Object> requestBody = new HashMap<>();
        Map<String, Object> contentPart = new HashMap<>();
        contentPart.put("text", prompt);

        Map<String, Object> content = new HashMap<>();
        content.put("parts", Collections.singletonList(contentPart));

        requestBody.put("contents", Collections.singletonList(content));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);

            // Gemini returns under "candidates[0].content.parts[0].text"
            Map<String, Object> responseBody = response.getBody();
            if (responseBody != null && responseBody.containsKey("candidates")) {
                List candidates = (List) responseBody.get("candidates");
                if (!candidates.isEmpty()) {
                    Map candidate = (Map) candidates.get(0);
                    Map contentMap = (Map) candidate.get("content");
                    List parts = (List) contentMap.get("parts");
                    if (!parts.isEmpty()) {
                        Map part = (Map) parts.get(0);
                        String analysisText = (String) part.get("text");

                        // Return as JSON string
                        return ResponseEntity.ok(analysisText);
                    }
                }
            }

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to parse Gemini response structure.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to analyze CV: " + e.getMessage());
        }
    }
}
