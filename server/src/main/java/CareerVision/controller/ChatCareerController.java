package CareerVision.controller;

import CareerVision.dto.ChatCareerRequestDTO;
import CareerVision.dto.ChatCareerResponseDTO;
import CareerVision.dto.CareerProfileDTO;
import CareerVision.model.CareerProfile;
import CareerVision.repository.CareerProfileRepository;
import CareerVision.service.GeminiCareerAnalyzerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/chatbot")
public class ChatCareerController {

    @Autowired
    private GeminiCareerAnalyzerService geminiService;

    @Autowired
    private CareerProfileRepository careerRepository;

    @PostMapping("/career")
    public ResponseEntity<ChatCareerResponseDTO> getCareerSuggestions(@RequestBody ChatCareerRequestDTO request) {

        // Step 1: Use Gemini to analyze user message
        Map<String, Object> analysis = geminiService.analyzeUserMessage(request.getUserMessage());
        @SuppressWarnings("unchecked")
        List<String> interestDomains = (List<String>) analysis.get("interestDomains");
        String explanation = (String) analysis.get("explanation");

        // Step 2: Query database for matching careers
        List<CareerProfile> matches = careerRepository.findByInterestTagsIn(interestDomains);

        // Step 3: Convert to DTOs
        List<CareerProfileDTO> dtoList = matches.stream()
                .map(CareerProfileDTO::fromEntity)
                .toList();

        // Step 4: Return explanation + recommended careers
        return ResponseEntity.ok(new ChatCareerResponseDTO(explanation, dtoList));
    }
}
