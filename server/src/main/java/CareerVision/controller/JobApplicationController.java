package CareerVision.controller;

import CareerVision.model.*;
import CareerVision.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/applications")
public class JobApplicationController {

    @Autowired
    private JobApplicationRepository applicationRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private JobRepository jobRepo;

    // Apply to a job
    @PostMapping("/apply")
    public String applyToJob(@RequestParam Long userId, @RequestParam Long jobId) {
        Optional<User> userOpt = userRepo.findById(userId);
        Optional<Job> jobOpt = jobRepo.findById(jobId);

        if (userOpt.isPresent() && jobOpt.isPresent()) {
            JobApplication application = new JobApplication();
            application.setApplicant(userOpt.get());
            application.setJob(jobOpt.get());
            application.setStatus("Applied");

            applicationRepo.save(application);
            return "Applied successfully!";
        } else {
            return "Invalid user or job ID.";
        }
    }
}
