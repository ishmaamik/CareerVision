package CareerVision.controller;

import CareerVision.model.Event;
import CareerVision.model.Participant;
import CareerVision.service.EventService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Arrays;
import java.util.stream.Collectors;
import org.hibernate.Hibernate;

@RestController
@RequestMapping("/api/events")
@Tag(name = "Event Management", description = "APIs for managing events and registrations")
public class EventController {
    private static final Logger logger = LoggerFactory.getLogger(EventController.class);

    @Autowired
    private EventService eventService;

    @PostMapping
    @Operation(summary = "Create a new event", description = "Allows creating a new event with full details")
    public ResponseEntity<?> createEvent(@Validated @RequestBody Event event) {
        try {
            logger.info("Received event creation request: {}", event);
            
            Event createdEvent = eventService.createEvent(event);
            
            logger.info("Event created successfully: {}", createdEvent);
            
            return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(createdEvent);
        } catch (IllegalArgumentException e) {
            logger.error("Validation error creating event", e);
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResponse("Validation Error", e.getMessage()));
        } catch (Exception e) {
            logger.error("Unexpected error creating event", e);
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Server Error", "Failed to create event"));
        }
    }

    @GetMapping
    @Operation(summary = "Get all upcoming events", description = "Retrieves a list of all upcoming public events")
    public ResponseEntity<List<Event>> getUpcomingEvents() {
        try {
            List<Event> events = eventService.getUpcomingEvents();
            logger.info("Retrieved {} upcoming events", events.size());
            return ResponseEntity.ok(events);
        } catch (Exception e) {
            logger.error("Error retrieving upcoming events", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/type/{eventType}")
    @Operation(summary = "Get events by type", description = "Retrieves events of a specific type")
    public ResponseEntity<?> getEventsByType(
        @PathVariable String eventType, 
        @RequestParam(required = false, defaultValue = "false") boolean includeDetails
    ) {
        try {
            // Convert string to enum, handling potential invalid input
            Event.EventType parsedEventType;
            try {
                parsedEventType = Event.EventType.valueOfIgnoreCase(eventType);
            } catch (IllegalArgumentException e) {
                logger.error("Invalid event type requested: {}", eventType);
                return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Invalid Input", 
                        "Invalid event type. Valid types are: " + 
                        Arrays.toString(Event.EventType.values())
                    ));
            }

            // Fetch events
            List<Event> events = eventService.getEventsByType(parsedEventType);
            
            // If details are requested, return full event information
            if (includeDetails) {
                // Manually initialize lazy-loaded collections
                for (Event event : events) {
                    Hibernate.initialize(event.getParticipants());
                }
                return ResponseEntity.ok(events);
            }
            
            // Otherwise, return a simplified view
            List<Map<String, Object>> simplifiedEvents = events.stream()
                .map(event -> {
                    Map<String, Object> simplified = new HashMap<>();
                    simplified.put("id", event.getId());
                    simplified.put("title", event.getTitle());
                    simplified.put("eventDate", event.getEventDate());
                    simplified.put("location", event.getLocation());
                    simplified.put("participantsCount", 
                        event.getParticipants() != null ? event.getParticipants().size() : 0
                    );
                    return simplified;
                })
                .collect(Collectors.toList());

            return ResponseEntity.ok(simplifiedEvents);
        } catch (Exception e) {
            logger.error("Unexpected error retrieving events of type " + eventType, e);
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Server Error", "Failed to fetch events"));
        }
    }

    @PostMapping("/{eventId}/register/{userId}")
    @Operation(summary = "Register for an event", description = "Allows a user to register for a specific event")
    public ResponseEntity<?> registerForEvent(
        @PathVariable Long eventId, 
        @PathVariable Long userId
    ) {
        try {
            Participant participant = eventService.registerForEvent(eventId, userId);
            return new ResponseEntity<>(participant, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            logger.error("Error registering for event", e);
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResponse("Registration Error", e.getMessage()));
        }
    }

    @DeleteMapping("/{eventId}/cancel/{userId}")
    @Operation(summary = "Cancel event registration", description = "Allows a user to cancel their registration for an event")
    public ResponseEntity<?> cancelEventRegistration(
        @PathVariable Long eventId, 
        @PathVariable Long userId
    ) {
        try {
            eventService.cancelEventRegistration(eventId, userId);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            logger.error("Error cancelling event registration", e);
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResponse("Cancellation Error", e.getMessage()));
        }
    }

    @GetMapping("/{eventId}/participants")
    @Operation(summary = "Get event participants", description = "Retrieves all participants for a specific event")
    public ResponseEntity<List<Participant>> getEventParticipants(@PathVariable Long eventId) {
        try {
            List<Participant> participants = eventService.getEventParticipants(eventId);
            logger.info("Retrieved {} participants for event {}", participants.size(), eventId);
            return ResponseEntity.ok(participants);
        } catch (Exception e) {
            logger.error("Error retrieving event participants", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Error response class for consistent error handling
    public static class ErrorResponse {
        private String status;
        private String message;

        public ErrorResponse(String status, String message) {
            this.status = status;
            this.message = message;
        }

        // Getters and setters
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
    }
}
