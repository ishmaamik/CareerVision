package CareerVision.controller;

import CareerVision.model.Job;
import CareerVision.model.SavedJob;
import CareerVision.service.SavedJobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/saved-jobs")
@CrossOrigin(origins = {"*"})
public class SavedJobController {
    
    @Autowired
    private SavedJobService savedJobService;

    @PostMapping("/save")
    public ResponseEntity<?> saveJob(@RequestBody Map<String, Long> payload) {
        try {
            Long userId = payload.get("userId");
            Long jobId = payload.get("jobId");

            if (userId == null || jobId == null) {
                return ResponseEntity.badRequest().body("User ID and Job ID are required");
            }

            SavedJob savedJob = savedJobService.saveJob(userId, jobId);
            return ResponseEntity.ok(savedJob);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("An error occurred while saving the job");
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Job>> getSavedJobsForUser(@PathVariable Long userId) {
        try {
            List<Job> savedJobs = savedJobService.getSavedJobsForUser(userId);
            return ResponseEntity.ok(savedJobs);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(null);
        }
    }

    @DeleteMapping("/unsave")
    public ResponseEntity<?> unsaveJob(@RequestBody Map<String, Long> payload) {
        try {
            Long userId = payload.get("userId");
            Long jobId = payload.get("jobId");

            if (userId == null || jobId == null) {
                return ResponseEntity.badRequest().body("User ID and Job ID are required");
            }

            savedJobService.unsaveJob(userId, jobId);
            return ResponseEntity.ok(Map.of("message", "Job unsaved successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("An error occurred while unsaving the job");
        }
    }

    @GetMapping("/is-saved")
    public ResponseEntity<Boolean> isJobSavedByUser(
        @RequestParam Long userId, 
        @RequestParam Long jobId
    ) {
        try {
            boolean isSaved = savedJobService.isJobSavedByUser(userId, jobId);
            return ResponseEntity.ok(isSaved);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(false);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(false);
        }
    }

    @GetMapping("/count/{userId}")
    public ResponseEntity<Long> countSavedJobsForUser(@PathVariable Long userId) {
        try {
            long savedJobCount = savedJobService.countSavedJobsForUser(userId);
            return ResponseEntity.ok(savedJobCount);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(0L);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(0L);
        }
    }
}
