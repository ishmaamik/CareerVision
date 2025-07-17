package CareerVision.repository;

import CareerVision.model.Job;
import CareerVision.model.SavedJob;
import CareerVision.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SavedJobRepository extends JpaRepository<SavedJob, Long> {
    List<SavedJob> findByUser(User user);
    boolean existsByUserAndJob(User user, Job job);
}
