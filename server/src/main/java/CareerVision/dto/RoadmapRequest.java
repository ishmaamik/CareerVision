package CareerVision.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoadmapRequest {
    private Long userId;

    // Goals
    private String primaryGoal;
    private String specificArea;

    // Experience
    private List<String> selfAssessment;
    private String experienceDescription;

    // Time Commitment
    private String hoursPerWeek;
    private String pace;

    // Preferences
    private String learningStyle;
    private String difficulty;

    // Languages
    private List<Language> languages;

    // Tools
    private String tools;

    // Demographic Information
    private String ageRange;
    private String status;

    // Feedback
    private String feedback;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Language {
        private String name;
        private Integer priority;
    }
}