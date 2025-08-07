package CareerVision.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ChatCareerResponseDTO {
    private String explanation;
    private List<CareerProfileDTO> recommendedCareers;
}
