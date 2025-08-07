package CareerVision.service;

import CareerVision.dto.CareerProfileDTO;
import CareerVision.model.CareerProfile;
import CareerVision.repository.CareerProfileRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class GeminiCareerAnalyzerService {

    private final OkHttpClient httpClient = new OkHttpClient();
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final CareerProfileRepository careerRepository;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    private static final String GEMINI_URL =
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

    public Map<String, Object> analyzeUserMessage(String userMessage) {
        try {
            // ✅ Build a controlled, tag-compatible prompt
            String prompt = """
                You are a career guidance chatbot helping Bangladeshi students find career paths.

                The user will describe their interests, hobbies, or goals in free-form text.

                🎯 Your task:
                1. Pick **exactly 2–3 tags** from this list ONLY:

                ["STEM", "Arts", "Business", "Social", "Communication", "Public Service", "Teaching", "Health", "Legal", "Agriculture", "Freelancing", "Technology", "Leadership", "Creative", "Engineering"]

                2. Write a short explanation for why these tags match the user's message.

                🔒 Use ONLY tags from the list above — no new tags.

                👨‍🎓 Example Input:
                "I like creative freedom, freelance potential, and working across industries."

                ✅ Example Output (strict JSON):
                {
                  "interestDomains": ["Creative", "Freelancing"],
                  "explanation": "Your interest in creative freedom and freelancing aligns with career paths like graphic design, content creation, or marketing."
                }

                Now respond in ONLY that strict JSON format.

                User input:
                "%s"
                """.formatted(userMessage);

            // ✅ Build request body for Gemini
            String requestJson = objectMapper.writeValueAsString(Map.of(
                    "contents", List.of(
                            Map.of("parts", List.of(
                                    Map.of("text", prompt)
                            ))
                    )
            ));

            // ✅ Send HTTP request to Gemini
            Request request = new Request.Builder()
                    .url(GEMINI_URL + "?key=" + geminiApiKey)
                    .post(RequestBody.create(requestJson, MediaType.get("application/json")))
                    .addHeader("Content-Type", "application/json")
                    .build();

            Response response = httpClient.newCall(request).execute();
            if (!response.isSuccessful()) throw new IOException("Gemini API call failed: " + response);

            // ✅ Parse the full response
            String responseBody = response.body().string();
            JsonNode root = objectMapper.readTree(responseBody);

            String text = root
                    .path("candidates").get(0)
                    .path("content")
                    .path("parts").get(0)
                    .path("text").asText();

            System.out.println("🧠 Gemini raw output: " + text); // for debugging

            // Remove Markdown-style code block if it exists
            if (text.startsWith("```json") || text.startsWith("```")) {
                text = text.replaceAll("(?s)```json|```", "").trim();
            }

// Now safely parse
            JsonNode result = objectMapper.readTree(text);

            List<String> tags = objectMapper.convertValue(result.get("interestDomains"), List.class);
            String explanation = result.get("explanation").asText();

            // ✅ Query your DB for matching career profiles
            List<CareerProfile> matchedCareers = careerRepository.findByInterestTagsIn(tags);
            List<CareerProfileDTO> dtoList = matchedCareers.stream()
                    .map(CareerProfileDTO::fromEntity)
                    .toList();

            // ✅ Return the full chatbot response
            Map<String, Object> responseMap = new HashMap<>();
            responseMap.put("interestDomains", tags);
            responseMap.put("explanation", explanation);
            responseMap.put("recommendedCareers", dtoList);
            return responseMap;

        } catch (Exception e) {
            e.printStackTrace();
            return Map.of(
                    "interestDomains", List.of(),
                    "explanation", "Sorry! I couldn't analyze your input properly. Please try rephrasing your interests like 'I want to do BCS', 'I love programming', or 'I like teaching'.",
                    "recommendedCareers", List.of()
            );
        }
    }
}
