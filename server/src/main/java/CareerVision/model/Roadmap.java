package CareerVision.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "roadmaps")
public class Roadmap {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Goals
    @Column(name = "primary_goal")
    private String primaryGoal;

    @Column(name = "specific_area")
    private String specificArea;

    // Experience
    @ElementCollection
    @CollectionTable(name = "roadmap_self_assessment", joinColumns = @JoinColumn(name = "roadmap_id"))
    @Column(name = "assessment")
    private List<String> selfAssessment;

    @Column(name = "experience_description", columnDefinition = "TEXT")
    private String experienceDescription;

    // Time Commitment
    @Column(name = "hours_per_week")
    private String hoursPerWeek;

    @Column(name = "pace")
    private String pace;

    // Preferences
    @Column(name = "learning_style")
    private String learningStyle;

    @Column(name = "difficulty")
    private String difficulty;

    // Languages
    @ElementCollection
    @CollectionTable(name = "roadmap_languages", joinColumns = @JoinColumn(name = "roadmap_id"))
    private List<Language> languages;

    // Tools
    @Column(name = "tools")
    private String tools;

    // Demographic Information
    @Column(name = "age_range")
    private String ageRange;

    @Column(name = "status")
    private String status;

    // Generated Roadmap
    @Column(name = "generated_roadmap", columnDefinition = "TEXT")
    private String generatedRoadmap;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "feedback")
    private String feedback;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Language {
        @Column(name = "name")
        private String name;

        @Column(name = "priority")
        private Integer priority;
    }
}