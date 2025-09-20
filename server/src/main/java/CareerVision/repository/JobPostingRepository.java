package CareerVision.repository;

import CareerVision.model.JobPosting;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobPostingRepository extends JpaRepository<JobPosting, Long> {
    // Find job postings by company name
    List<JobPosting> findByCompanyName(String companyName);

    // Find job postings by job type
    List<JobPosting> findByJobType(JobPosting.JobType jobType);

    // Find job postings by experience level
    List<JobPosting> findByExperienceLevel(JobPosting.ExperienceLevel experienceLevel);

    // Find active job postings
    List<JobPosting> findByIsActiveTrue();

    // Find job postings with salary range
    @Query("SELECT j FROM JobPosting j WHERE j.salaryRangeMin >= :minSalary AND j.salaryRangeMax <= :maxSalary")
    List<JobPosting> findBySalaryRange(
        @Param("minSalary") Double minSalary, 
        @Param("maxSalary") Double maxSalary
    );

    // Search job postings by title or description
    @Query("SELECT j FROM JobPosting j WHERE LOWER(j.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(j.description) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<JobPosting> searchJobPostings(
        @Param("keyword") String keyword, 
        Pageable pageable
    );

    // Find job postings by location
    List<JobPosting> findByLocation(String location);

    // Count active job postings
    long countByIsActiveTrue();

    // Find job postings with specific skills
    @Query("SELECT j FROM JobPosting j WHERE :skill MEMBER OF j.requiredSkills")
    List<JobPosting> findByRequiredSkill(@Param("skill") String skill);
}
