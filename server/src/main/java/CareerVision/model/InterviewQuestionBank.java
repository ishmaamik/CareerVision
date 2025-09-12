package CareerVision.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class InterviewQuestionBank {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @Column(length = 1000, nullable = false)
    private String question;

    @Column(length = 2000)
    private String answer;

    @Column(nullable = false)
    private String difficulty; // Easy, Medium, Hard

    @Column(nullable = false)
    private String category; // Technical, Behavioral, HR, etc.

    @Column(nullable = false)
    private String submittedBy; // Username or anonymous

    @Column(nullable = false)
    private LocalDateTime submittedAt;

    @Column(nullable = true)
    private Integer upvotes = 0;

    @Column(nullable = true)
    private Integer downvotes = 0;

    @Column(nullable = true)
    private String pdfResourceUrl; // Optional PDF upload
}
