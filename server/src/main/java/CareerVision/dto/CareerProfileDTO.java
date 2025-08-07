package CareerVision.dto;

import CareerVision.model.CareerProfile;
import lombok.Data;

import java.util.List;

@Data
public class CareerProfileDTO {
    private Long id;
    private String careerTitle;
    private String summary;
    private List<String> interestTags;

    public static CareerProfileDTO fromEntity(CareerProfile careerProfile) {
        CareerProfileDTO dto = new CareerProfileDTO();
        dto.setId(careerProfile.getId());
        dto.setCareerTitle(careerProfile.getCareerTitle());
        dto.setSummary(careerProfile.getSummary());
        dto.setInterestTags(careerProfile.getInterestTags());
        return dto;
    }
}
