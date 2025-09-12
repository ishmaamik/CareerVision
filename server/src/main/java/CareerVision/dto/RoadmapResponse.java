
package CareerVision.dto;

import CareerVision.model.Roadmap;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoadmapResponse {
    private boolean success;
    private Roadmap roadmap;
    private String message;
    private String error;

    public RoadmapResponse(boolean success, Roadmap roadmap) {
        this.success = success;
        this.roadmap = roadmap;
    }

    public RoadmapResponse(boolean success, String message, String error) {
        this.success = success;
        this.message = message;
        this.error = error;
    }
}