package CareerVision.service;

import CareerVision.dto.JobDTO;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class JobSearchService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    private final String APP_ID = "162150c1";
    private final String APP_KEY = "8d476db61efb877057df658d7753025b";

    public List<JobDTO> searchJobs(String keyword, String location) {
        String url = String.format(
                "https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=%s&app_key=%s&what=%s&where=%s&results_per_page=10",
                APP_ID, APP_KEY, keyword, location);

        String response = restTemplate.getForObject(url, String.class);

        List<JobDTO> jobs = new ArrayList<>();

        try {
            JsonNode root = objectMapper.readTree(response);
            JsonNode results = root.get("results");

            if (results.isArray()) {
                for (JsonNode result : results) {
                    JobDTO job = new JobDTO();
                    job.setTitle(result.get("title").asText());
                    job.setCompany(result.get("company").get("display_name").asText());
                    job.setLocation(result.get("location").get("display_name").asText());
                    job.setCategory(result.get("category").get("label").asText());
                    job.setDescription(result.get("description").asText());
                    job.setRedirectUrl(result.get("redirect_url").asText());
                    jobs.add(job);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();  // log properly in real apps
        }

        return jobs;
    }
}
