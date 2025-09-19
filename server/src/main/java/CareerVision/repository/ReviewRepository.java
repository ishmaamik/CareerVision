package CareerVision.repository;

import CareerVision.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    // Find reviews by job ID
    List<Review> findByJobId(Long jobId);

    // Calculate average rating for a specific job
    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.jobId = :jobId")
    Double findAverageRatingByJobId(Long jobId);
}
