package CareerVision.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
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
    private List<String> selfAssessment; // Will be converted to comma-separated string
    private String experienceDescription;

    // Time Commitment
    private String hoursPerWeek;
    private String pace;

    // Preferences
    private String learningStyle;
    private String difficulty;

    private List<LanguageDto> languages;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class LanguageDto {
        private String name;
        private Integer priority;
    }
}