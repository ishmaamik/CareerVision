package CareerVision.controller;

import CareerVision.dto.UserJobDTO;
import CareerVision.model.Job;
import CareerVision.model.JobApplication;
import CareerVision.model.User;
import CareerVision.repository.JobApplicationRepository;
import CareerVision.repository.JobRepository;
import CareerVision.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "*")
public class JobApplicationController {

    private static final Logger log = LoggerFactory.getLogger(JobApplicationController.class);
    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobRepository jobRepository;

    // Apply to a job
    @PostMapping("/apply")
    public ResponseEntity<?> applyToJob(@RequestBody UserJobDTO userJob) {

        log.info("Received UserJobDTO: {}", userJob);

        User user = userRepository.findById(userJob.getUserId()).orElse(null);
        Job job = jobRepository.findById(userJob.getJobId()).orElse(null);

        if (user == null || job == null) {
            return ResponseEntity.badRequest().body("Invalid user ID or job ID");
        }



        JobApplication application = new JobApplication();
        application.setApplicant(user);
        application.setJob(job);
//
        jobApplicationRepository.save(application);

        return ResponseEntity.ok("Application submitted successfully");
    }

    // Get all applications by user
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getApplicationsByUser(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }

        List<JobApplication> applications = jobApplicationRepository.findByApplicant(user);
        return ResponseEntity.ok(applications);
    }


    // Get all applications for a job
    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<JobApplication>> getApplicationsForJob(@PathVariable Long jobId) {
        List<JobApplication> applications = jobApplicationRepository.findByJobId(jobId);
        return ResponseEntity.ok(applications);
    }



    @PutMapping("/{applicationId}/status")
    public ResponseEntity<?> updateApplicationStatus(
            @PathVariable Long applicationId,
            @RequestParam String status
    ) {
        JobApplication application = jobApplicationRepository.findById(applicationId).orElse(null);
        if (application == null) {
            return ResponseEntity.badRequest().body("Application not found");
        }

        // Validate status value
        if (!List.of("pending", "accepted", "rejected").contains(status.toLowerCase())) {
            return ResponseEntity.badRequest().body("Invalid status");
        }

        application.setStatus(status);
        jobApplicationRepository.save(application);

        return ResponseEntity.ok("Status updated to " + status);
    }

    @PostMapping("/{applicationId}/match-percentage")
    public ResponseEntity<?> updateMatchPercentage(
        @PathVariable Long applicationId, 
        @RequestParam Double percentage
    ) {
        try {
            Optional<JobApplication> optionalApplication = jobApplicationRepository.findById(applicationId);
            
            if (optionalApplication.isPresent()) {
                JobApplication application = optionalApplication.get();
                application.updateMatchPercentage(percentage);
                
                JobApplication updatedApplication = jobApplicationRepository.save(application);
                
                return ResponseEntity.ok(updatedApplication);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating match percentage: " + e.getMessage());
        }
    }

}