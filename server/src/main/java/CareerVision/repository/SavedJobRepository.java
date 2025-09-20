package CareerVision.repository;

import CareerVision.model.SavedJob;
import CareerVision.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SavedJobRepository extends JpaRepository<SavedJob, Long> {
    // Find saved jobs for a specific user
    List<SavedJob> findByUserAndIsActiveTrue(User user);

    // Check if a job is already saved by a user
    Optional<SavedJob> findByUserAndJobIdAndIsActiveTrue(User user, Long jobId);

    // Count saved jobs for a user
    long countByUserAndIsActiveTrue(User user);
}
