package CareerVision.service;

import CareerVision.model.Job;
import CareerVision.model.SavedJob;
import CareerVision.model.User;
import CareerVision.repository.JobRepository;
import CareerVision.repository.SavedJobRepository;
import CareerVision.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SavedJobService {
    
    @Autowired
    private SavedJobRepository savedJobRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobRepository jobRepository;

    @Transactional
    public SavedJob saveJob(Long userId, Long jobId) {
        // Find user and job
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        Job job = jobRepository.findById(jobId)
            .orElseThrow(() -> new RuntimeException("Job not found"));

        // Check if job is already saved
        Optional<SavedJob> existingSavedJob = savedJobRepository
            .findByUserAndJobIdAndIsActiveTrue(user, jobId);
        
        if (existingSavedJob.isPresent()) {
            // Job already saved, return existing saved job
            return existingSavedJob.get();
        }

        // Create new saved job
        SavedJob savedJob = new SavedJob(user, job);
        return savedJobRepository.save(savedJob);
    }

    @Transactional(readOnly = true)
    public List<Job> getSavedJobsForUser(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        return savedJobRepository.findByUserAndIsActiveTrue(user)
            .stream()
            .map(SavedJob::getJob)
            .collect(Collectors.toList());
    }

    @Transactional
    public void unsaveJob(Long userId, Long jobId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        SavedJob savedJob = savedJobRepository
            .findByUserAndJobIdAndIsActiveTrue(user, jobId)
            .orElseThrow(() -> new RuntimeException("Saved job not found"));

        savedJob.setIsActive(false);
        savedJobRepository.save(savedJob);
    }

    @Transactional(readOnly = true)
    public boolean isJobSavedByUser(Long userId, Long jobId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        return savedJobRepository
            .findByUserAndJobIdAndIsActiveTrue(user, jobId)
            .isPresent();
    }

    @Transactional(readOnly = true)
    public long countSavedJobsForUser(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        return savedJobRepository.countByUserAndIsActiveTrue(user);
    }
}
