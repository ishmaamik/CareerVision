package CareerVision.model;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String organizerEmail;
    private LocalDateTime eventDate;
    private String location;

    @ManyToMany(fetch = FetchType.LAZY)
    @JsonIgnore
    private List<User> participants = new ArrayList<>();
}
