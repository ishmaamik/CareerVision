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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
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
        application.setDistance(userJob.getDistance());
        jobApplicationRepository.save(application);

        return ResponseEntity.ok(application);
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

    // YOUR ORIGINAL CODE - RESTORED
    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<JobApplication>> getApplicationsForJob(@PathVariable Long jobId) {
        List<JobApplication> applications = jobApplicationRepository.findByJobId(jobId);
        return ResponseEntity.ok(applications);
    }

    // NEW SEPARATE METHOD - with JOIN FETCH for when you need applicant data loaded
    @GetMapping("/job/{jobId}/with-applicant")
    public ResponseEntity<List<JobApplication>> getApplicationsForJobWithApplicant(@PathVariable Long jobId) {
        System.out.println("=== Getting applications with applicant data for job: " + jobId + " ===");

        List<JobApplication> applications = jobApplicationRepository.findByJobIdWithApplicant(jobId);

        System.out.println("Found " + applications.size() + " applications");

        // Debug each application
        for (JobApplication app : applications) {
            System.out.println("App ID: " + app.getId() +
                    ", Applicant: " + (app.getApplicant() != null ? app.getApplicant().getName() : "NULL APPLICANT") +
                    ", Email: " + (app.getApplicant() != null ? app.getApplicant().getEmail() : "NULL EMAIL") +
                    ", Status: " + app.getStatus());
        }

        return ResponseEntity.ok(applications);
    }

    // FILTERED ENDPOINT - uses the JOIN FETCH method internally
    @GetMapping("/filtered")
    public ResponseEntity<?> getFilteredApplications(
            @RequestParam Long jobId,
            @RequestParam(defaultValue = "all") String filterType,
            @RequestParam(defaultValue = "10") Double locationThreshold,
            @RequestParam(defaultValue = "80") Double percentageThreshold,
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "percentage") String sortBy,
            @RequestParam(required = false) Integer limit
    ) {
        System.out.println("=== FILTERED ENDPOINT CALLED ===");
        System.out.println("Job ID: " + jobId);
        System.out.println("Filter Type: " + filterType);
        System.out.println("Search: '" + search + "'");

        try {
            List<JobApplication> applications = getFilteredApplicationsInternal(
                    jobId, filterType, locationThreshold, percentageThreshold, search, sortBy, limit
            );

            System.out.println("Returning " + applications.size() + " filtered applications");
            return ResponseEntity.ok(applications);

        } catch (Exception e) {
            System.err.println("Error in filtered endpoint: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    private List<JobApplication> getFilteredApplicationsInternal(
            Long jobId,
            String filterType,
            Double locationThreshold,
            Double percentageThreshold,
            String search,
            String sortBy,
            Integer limit
    ) {
        System.out.println("=== INTERNAL SERVICE DEBUG ===");
        System.out.println("Job ID: " + jobId);
        System.out.println("Filter Type: " + filterType);
        System.out.println("Search: " + search);
        System.out.println("Limit: " + limit);

        try {
            // Use the JOIN FETCH method for filtering (needs applicant data)
            List<JobApplication> applications = jobApplicationRepository
                    .findByJobIdWithApplicant(jobId);

            System.out.println("Raw applications found: " + applications.size());

            // Apply filtering in Java
            List<JobApplication> filtered = applications.stream()
                    .filter(app -> applyFilters(app, filterType, locationThreshold, percentageThreshold, search))
                    .sorted((a, b) -> applySorting(a, b, sortBy))
                    .limit(limit != null && limit > 0 ? limit : Integer.MAX_VALUE)
                    .collect(Collectors.toList());

            System.out.println("Filtered applications: " + filtered.size());

            // Debug each application
            for (JobApplication app : filtered) {
                System.out.println("App ID: " + app.getId() +
                        ", Applicant: " + (app.getApplicant() != null ? app.getApplicant().getName() : "NULL APPLICANT") +
                        ", Email: " + (app.getApplicant() != null ? app.getApplicant().getEmail() : "NULL EMAIL") +
                        ", Status: " + app.getStatus() +
                        ", Match%: " + app.getMatchPercentage() +
                        ", Distance: " + app.getDistance());
            }

            return filtered;
        } catch (Exception e) {
            System.err.println("ERROR in getFilteredApplications: " + e.getMessage());
            e.printStackTrace();
            return new ArrayList<>();
        }
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

    private boolean applyFilters(JobApplication app, String filterType, Double locationThreshold,
                                 Double percentageThreshold, String search) {
        // Filter by type
        if ("location".equals(filterType) && app.getDistance() != null && app.getDistance() > locationThreshold) {
            return false;
        }
        if ("percentage".equals(filterType) && app.getMatchPercentage() != null && app.getMatchPercentage() < percentageThreshold) {
            return false;
        }

        // Filter by search
        if (search != null && !search.trim().isEmpty()) {
            String searchLower = search.toLowerCase();
            User applicant = app.getApplicant();
            if (applicant != null) {
                String name = applicant.getName() != null ? applicant.getName().toLowerCase() : "";
                String location = applicant.getLocation() != null ? applicant.getLocation().toLowerCase() : "";
                if (!name.contains(searchLower) && !location.contains(searchLower)) {
                    return false;
                }
            }
        }

        return true;
    }

    private int applySorting(JobApplication a, JobApplication b, String sortBy) {
        if ("location".equals(sortBy)) {
            if (a.getDistance() == null && b.getDistance() == null) return 0;
            if (a.getDistance() == null) return 1;
            if (b.getDistance() == null) return -1;
            return Double.compare(a.getDistance(), b.getDistance());
        } else { // percentage
            if (a.getMatchPercentage() == null && b.getMatchPercentage() == null) return 0;
            if (a.getMatchPercentage() == null) return 1;
            if (b.getMatchPercentage() == null) return -1;
            return Double.compare(b.getMatchPercentage(), a.getMatchPercentage()); // DESC
        }
    }
}