package CareerVision.model;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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

    // Goals fields
    @Column(name = "primary_goal")
    private String primaryGoal;

    @Column(name = "specific_area")
    private String specificArea;

    // Experience fields
    @Column(name = "self_assessment", columnDefinition = "TEXT")
    private String selfAssessment; // Store as comma-separated string

    @Column(name = "experience_description", columnDefinition = "TEXT")
    private String experienceDescription;

    // Time Commitment fields
    @Column(name = "hours_per_week")
    private String hoursPerWeek;

    @Column(name = "pace")
    private String pace;

    // Preferences fields
    @Column(name = "learning_style")
    private String learningStyle;

    @Column(name = "difficulty")
    private String difficulty;

    @OneToMany(mappedBy = "roadmap", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Language> languages;

    @Column(columnDefinition = "TEXT")
    private String generatedRoadmap;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}