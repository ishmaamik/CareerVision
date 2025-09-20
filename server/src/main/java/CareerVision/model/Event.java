package CareerVision.model;

import jakarta.persistence.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Arrays;
import java.util.stream.Collectors;

@Entity
@Table(name = "events")
public class Event {
    private static final Logger logger = LoggerFactory.getLogger(Event.class);

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 1000)
    private String description;

    @Column(nullable = false)
    private LocalDateTime eventDate;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private String organizerEmail;

    @Enumerated(EnumType.STRING)
    private EventType eventType;

    @Column(nullable = false)
    private boolean isPublic = true;

    // Change to EAGER loading and initialize with empty list
    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Participant> participants = new ArrayList<>();

    // Enum for event types
    public enum EventType {
        WEBINAR("Webinar"),
        WORKSHOP("Workshop"),
        CONFERENCE("Conference"),
        NETWORKING_EVENT("Networking Event"),
        CAREER_TALK("Career Talk");

        private final String displayName;

        EventType(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }

        // Case-insensitive parsing method
        public static EventType valueOfIgnoreCase(String name) {
            if (name == null) {
                return WORKSHOP; // Default value
            }
            
            for (EventType type : values()) {
                if (type.name().equalsIgnoreCase(name) || 
                    type.displayName.equalsIgnoreCase(name)) {
                    return type;
                }
            }
            
            throw new IllegalArgumentException("Invalid event type: " + name + 
                ". Valid types are: " + Arrays.toString(values()));
        }
    }

    // Constructors
    public Event() {}

    @PostPersist
    public void logGeneratedId() {
        logger.info("Event created with ID: {}", this.id);
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDateTime getEventDate() { return eventDate; }
    public void setEventDate(LocalDateTime eventDate) { this.eventDate = eventDate; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getOrganizerEmail() { return organizerEmail; }
    public void setOrganizerEmail(String organizerEmail) { this.organizerEmail = organizerEmail; }

    public EventType getEventType() { return eventType; }
    public void setEventType(EventType eventType) { this.eventType = eventType; }

    public boolean isPublic() { return isPublic; }
    public void setPublic(boolean isPublic) { this.isPublic = isPublic; }

    // Add method to safely get participants
    public List<Participant> getParticipants() {
        return participants != null ? participants : new ArrayList<>();
    }

    // Add method to set participants safely
    public void setParticipants(List<Participant> participants) {
        this.participants = participants != null ? participants : new ArrayList<>();
    }

    // Optional: toString method for logging
    @Override
    public String toString() {
        return "Event{" +
               "id=" + id +
               ", title='" + title + '\'' +
               ", eventType=" + eventType +
               ", eventDate=" + eventDate +
               '}';
    }
}
