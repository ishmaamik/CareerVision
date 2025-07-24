package CareerVision.repository;

import CareerVision.model.JobApplication;
import CareerVision.model.User;
import CareerVision.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    List<JobApplication> findByApplicant(User user);
    List<JobApplication> findByJob(Job job);
    List<JobApplication> findByApplicantId(Long applicantId);
}
