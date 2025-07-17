package CareerVision.controller;

import CareerVision.model.Job;
import CareerVision.model.SavedJob;
import CareerVision.model.User;
import CareerVision.repository.JobRepository;
import CareerVision.repository.SavedJobRepository;
import CareerVision.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/saved-jobs")
public class SavedJobController {

    @Autowired
    private SavedJobRepository savedJobRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobRepository jobRepository;

    // Save a job
    @PostMapping("/save")
    public ResponseEntity<?> saveJob(@RequestParam Long userId, @RequestParam Long jobId) {
        User user = userRepository.findById(userId).orElse(null);
        Job job = jobRepository.findById(jobId).orElse(null);

        if (user == null || job == null) {
            return ResponseEntity.badRequest().body("Invalid user or job ID");
        }

        if (savedJobRepository.existsByUserAndJob(user, job)) {
            return ResponseEntity.badRequest().body("Job already saved");
        }

        SavedJob savedJob = new SavedJob();
        savedJob.setUser(user);
        savedJob.setJob(job);
        savedJobRepository.save(savedJob);

        return ResponseEntity.ok("Job saved successfully");
    }

    // Get all saved jobs for a user
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getSavedJobs(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElse(null);

        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }

        List<SavedJob> savedJobs = savedJobRepository.findByUser(user);
        return ResponseEntity.ok(savedJobs);
    }

    // Remove saved job
    @DeleteMapping("/remove")
    public ResponseEntity<?> removeSavedJob(@RequestParam Long userId, @RequestParam Long jobId) {
        User user = userRepository.findById(userId).orElse(null);
        Job job = jobRepository.findById(jobId).orElse(null);

        if (user == null || job == null) {
            return ResponseEntity.badRequest().body("Invalid user or job ID");
        }

        List<SavedJob> savedJobs = savedJobRepository.findByUser(user);
        for (SavedJob sj : savedJobs) {
            if (sj.getJob().equals(job)) {
                savedJobRepository.delete(sj);
                return ResponseEntity.ok("Saved job removed");
            }
        }

        return ResponseEntity.badRequest().body("Saved job not found");
    }
}
