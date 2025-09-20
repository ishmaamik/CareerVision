package CareerVision.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "saved_jobs", 
    uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "job_id"})
)
public class SavedJob {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime savedAt;

    @Column(nullable = false)
    private Boolean isActive = true;

    // Constructors
    public SavedJob() {}

    public SavedJob(User user, Job job) {
        this.user = user;
        this.job = job;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Job getJob() { return job; }
    public void setJob(Job job) { this.job = job; }

    public LocalDateTime getSavedAt() { return savedAt; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }

    @Override
    public String toString() {
        return "SavedJob{" +
                "id=" + id +
                ", user=" + (user != null ? user.getId() : "null") +
                ", job=" + (job != null ? job.getId() : "null") +
                ", savedAt=" + savedAt +
                '}';
    }
}
