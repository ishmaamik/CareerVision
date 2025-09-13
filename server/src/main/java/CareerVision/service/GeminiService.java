package CareerVision.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GeminiService {
    
    private static final Logger logger = LoggerFactory.getLogger(GeminiService.class);
    
    @Value("${gemini.api.key}")
    private String apiKey;
    
    private final RestTemplate restTemplate;
    private static final String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
    
    public GeminiService() {
        this.restTemplate = new RestTemplate();
    }
    
    public String generateCareerAdvice(String userMessage, String userContext) {
        try {
            // Create the career-focused prompt
            String enhancedPrompt = createCareerPrompt(userMessage, userContext);
            
            // Prepare the request
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("X-goog-api-key", apiKey);
            
            Map<String, Object> requestBody = createRequestBody(enhancedPrompt);
            
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
            
            // Make the API call
            ResponseEntity<Map> response = restTemplate.exchange(
                GEMINI_API_URL, 
                HttpMethod.POST, 
                entity, 
                Map.class
            );
            
            // Extract response text
            return extractResponseText(response.getBody());
            
        } catch (Exception e) {
            logger.error("Error calling Gemini API: ", e);
            return generateFallbackResponse(userMessage);
        }
    }
    
    private String createCareerPrompt(String userMessage, String userContext) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("You are CareerVision AI, a professional career advisor and mentor. ");
        prompt.append("Your role is to provide helpful, actionable career guidance. ");
        prompt.append("You specialize in:\n");
        prompt.append("• Career planning and development\n");
        prompt.append("• Interview preparation and tips\n");
        prompt.append("• Resume and CV optimization\n");
        prompt.append("• Job search strategies\n");
        prompt.append("• Skill development recommendations\n");
        prompt.append("• Industry insights and trends\n");
        prompt.append("• Professional networking advice\n");
        prompt.append("• Work-life balance guidance\n\n");
        
        if (userContext != null && !userContext.isEmpty()) {
            prompt.append("User Context: ").append(userContext).append("\n\n");
        }
        
        prompt.append("Please provide a helpful, encouraging, and professional response to: ");
        prompt.append(userMessage);
        prompt.append("\n\nKeep your response:");
        prompt.append("\n• Practical and actionable");
        prompt.append("\n• Encouraging and supportive");
        prompt.append("\n• Professional yet friendly");
        prompt.append("\n• Concise but comprehensive");
        prompt.append("\n• Include specific steps when possible");
        
        return prompt.toString();
    }
    
    private Map<String, Object> createRequestBody(String prompt) {
        Map<String, Object> requestBody = new HashMap<>();
        Map<String, Object> content = new HashMap<>();
        Map<String, Object> part = new HashMap<>();
        
        part.put("text", prompt);
        content.put("parts", List.of(part));
        requestBody.put("contents", List.of(content));
        
        // Add generation config for better responses
        Map<String, Object> generationConfig = new HashMap<>();
        generationConfig.put("temperature", 0.7);
        generationConfig.put("maxOutputTokens", 1000);
        generationConfig.put("topP", 0.8);
        generationConfig.put("topK", 40);
        requestBody.put("generationConfig", generationConfig);
        
        return requestBody;
    }
    
    @SuppressWarnings("unchecked")
    private String extractResponseText(Map<String, Object> responseBody) {
        try {
            List<Map<String, Object>> candidates = (List<Map<String, Object>>) responseBody.get("candidates");
            if (candidates != null && !candidates.isEmpty()) {
                Map<String, Object> firstCandidate = candidates.get(0);
                Map<String, Object> content = (Map<String, Object>) firstCandidate.get("content");
                if (content != null) {
                    List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");
                    if (parts != null && !parts.isEmpty()) {
                        return (String) parts.get(0).get("text");
                    }
                }
            }
        } catch (Exception e) {
            logger.error("Error extracting response text: ", e);
        }
        return "I apologize, but I'm having trouble processing your request right now. Please try again.";
    }
    
    private String generateFallbackResponse(String userMessage) {
        String lowerMessage = userMessage.toLowerCase();
        
        if (lowerMessage.contains("interview")) {
            return "🎯 **Interview Preparation Tips:**\n\n" +
                   "• Research the company and role thoroughly\n" +
                   "• Practice common interview questions\n" +
                   "• Prepare specific examples using the STAR method\n" +
                   "• Dress professionally and arrive early\n" +
                   "• Prepare thoughtful questions about the role\n" +
                   "• Practice good body language and eye contact\n\n" +
                   "Would you like specific advice for any particular aspect of interview preparation?";
        } else if (lowerMessage.contains("resume") || lowerMessage.contains("cv")) {
            return "📄 **Resume Optimization Tips:**\n\n" +
                   "• Use a clean, professional format\n" +
                   "• Include relevant keywords from job descriptions\n" +
                   "• Quantify achievements with specific numbers\n" +
                   "• Keep it concise (1-2 pages maximum)\n" +
                   "• Tailor your resume for each application\n" +
                   "• Include a compelling professional summary\n\n" +
                   "What specific aspect of your resume would you like help with?";
        } else if (lowerMessage.contains("career") || lowerMessage.contains("job")) {
            return "🚀 **Career Development Guidance:**\n\n" +
                   "• Identify your strengths and interests\n" +
                   "• Set clear short and long-term career goals\n" +
                   "• Continuously develop relevant skills\n" +
                   "• Build a professional network\n" +
                   "• Stay updated with industry trends\n" +
                   "• Consider mentorship opportunities\n\n" +
                   "I'm here to help with your career journey! What specific area would you like to explore?";
        } else {
            return "💼 **Hello! I'm your CareerVision AI assistant.**\n\n" +
                   "I'm here to help you with:\n" +
                   "• Career planning and development\n" +
                   "• Interview preparation\n" +
                   "• Resume optimization\n" +
                   "• Job search strategies\n" +
                   "• Skill development\n\n" +
                   "How can I assist you with your career today?";
        }
    }
}
