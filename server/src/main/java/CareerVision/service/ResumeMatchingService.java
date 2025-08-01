package CareerVision.service;

import CareerVision.model.CVData;
import CareerVision.model.Job;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class ResumeMatchingService {

    @Value("${resume.matcher.url}")
    private String matcherUrl;

    @Autowired
    private final RestTemplate restTemplate;

    public ResumeMatchingService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public double calculateMatchPercentage(Job job, CVData cvData) {
        // Prepare request data
        Map<String, Object> request = new HashMap<>();

        // Job data
        Map<String, Object> jobData = new HashMap<>();
        jobData.put("title", job.getTitle());
        jobData.put("description", job.getDescription());
        jobData.put("company", job.getCompany());
        jobData.put("location", job.getLocation());
        jobData.put("responsibilities", job.getResponsibilities());
        jobData.put("skills", job.getSkills());
        jobData.put("qualifications", job.getQualifications());

        // CV data
        Map<String, Object> cvRequest = new HashMap<>();
        cvRequest.put("extracted_text", cvData.getExtractedText());
        cvRequest.put("skills", job.getSkills()); // Only compare against job skills

        request.put("job", jobData);
        request.put("resume", cvRequest);

        // Call Python service
        Map<String, Object> response = restTemplate.postForObject(
                matcherUrl + "/api/v1/match",  // Note the full path here
                request,
                Map.class
        );

        if (response != null && response.containsKey("match_percentage")) {
            return (Double) response.get("match_percentage");
        }

        return 0.0; // Default if matching fails
    }
}