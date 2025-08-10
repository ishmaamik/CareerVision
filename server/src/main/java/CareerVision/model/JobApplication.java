package CareerVision.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JobApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User applicant;

    @ManyToOne
    private Job job;

    private String status = "Pending";

    // New field to store match percentage
    @Column(name = "match_percentage")
    private Double matchPercentage;

    @Column(nullable = true)
    private Double distance;

    // Method to update match percentage
    public void updateMatchPercentage(Double percentage) {
        // Only update if not already set or if new percentage is different
        if (this.matchPercentage == null || 
            Math.abs(this.matchPercentage - percentage) > 0.01) {
            this.matchPercentage = percentage;
        }
    }
}
