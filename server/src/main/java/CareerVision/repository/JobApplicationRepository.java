package CareerVision.repository;

import CareerVision.model.JobApplication;
import CareerVision.model.User;
import CareerVision.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    List<JobApplication> findByApplicant(User user);
    List<JobApplication> findByJob(Job job);
    List<JobApplication> findByApplicantId(Long applicantId);
    List<JobApplication> findByJobId(Long jobId);
}
