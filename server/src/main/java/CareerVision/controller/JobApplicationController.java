package CareerVision.controller;

import CareerVision.model.Job;
import CareerVision.model.JobApplication;
import CareerVision.model.User;
import CareerVision.repository.JobApplicationRepository;
import CareerVision.repository.JobRepository;
import CareerVision.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class JobApplicationController {

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobRepository jobRepository;

    // Apply to a job
    @PostMapping("/apply")
    public ResponseEntity<?> applyToJob(@RequestParam Long userId, @RequestParam Long jobId) {
        User user = userRepository.findById(userId).orElse(null);
        Job job = jobRepository.findById(jobId).orElse(null);

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

    // ✅ Get all applications by user
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getApplicationsByUser(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }

        List<JobApplication> applications = jobApplicationRepository.findByApplicant(user);
        return ResponseEntity.ok(applications);
    }


    // ✅ Get all applications for a job
    @GetMapping("/job/{jobId}")
    public ResponseEntity<?> getApplicationsByJob(@PathVariable Long jobId) {
        Job job = jobRepository.findById(jobId).orElse(null);
        if (job == null) {
            return ResponseEntity.badRequest().body("Job not found");
        }

        List<JobApplication> applications = jobApplicationRepository.findByJob(job);
        return ResponseEntity.ok(applications);
    }

}
