package CareerVision.repository;

import CareerVision.model.JobApplication;
import CareerVision.model.User;
import CareerVision.model.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    List<JobApplication> findByApplicant(User user);
    List<JobApplication> findByJob(Job job);
    List<JobApplication> findByApplicantId(Long applicantId);
    List<JobApplication> findByJobId(Long jobId);


    // FIXED: This will solve the N+1 problem by fetching applicant data in one query
    @Query("SELECT ja FROM JobApplication ja " +
            "JOIN FETCH ja.applicant " +
            "WHERE ja.job.id = :jobId")
    List<JobApplication> findByJobIdWithApplicant(@Param("jobId") Long jobId);

    // Enhanced version with filtering
    @Query(value = "SELECT ja FROM JobApplication ja " +
            "JOIN FETCH ja.applicant a " +
            "WHERE ja.job.id = :jobId " +
            "AND (:filterType = 'all' OR " +
            "     (:filterType = 'location' AND ja.distance <= :locationThreshold) OR " +
            "     (:filterType = 'percentage' AND ja.matchPercentage >= :percentageThreshold)) " +
            "AND (:search = '' OR :search IS NULL OR " +
            "     LOWER(a.name) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "     LOWER(a.location) LIKE LOWER(CONCAT('%', :search, '%'))) " +
            "ORDER BY " +
            "CASE WHEN :sortBy = 'location' THEN ja.distance END ASC, " +
            "CASE WHEN :sortBy = 'percentage' THEN ja.matchPercentage END DESC",
            countQuery = "SELECT COUNT(ja) FROM JobApplication ja " +
                    "JOIN ja.applicant a " +
                    "WHERE ja.job.id = :jobId")
    Page<JobApplication> findFilteredApplicationsWithApplicant(
            @Param("jobId") Long jobId,
            @Param("filterType") String filterType,
            @Param("locationThreshold") Double locationThreshold,
            @Param("percentageThreshold") Double percentageThreshold,
            @Param("search") String search,
            @Param("sortBy") String sortBy,
            Pageable pageable
    );

}
