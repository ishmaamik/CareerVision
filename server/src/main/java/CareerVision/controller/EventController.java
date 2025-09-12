package CareerVision.controller;

import CareerVision.model.Event;
import CareerVision.model.User;
import CareerVision.repository.EventRepository;
import CareerVision.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    // 🔸 Create Event
    @PostMapping("/create")
    public ResponseEntity<?> createEvent(@RequestBody Event event) {
        if (event.getEventDate() == null) {
            event.setEventDate(LocalDateTime.now().plusDays(7));
        }
        eventRepository.save(event);
        return ResponseEntity.ok("Event created successfully.");
    }

    // 🔸 Get All Events
    @GetMapping("/all")
    public ResponseEntity<?> getAllEvents() {
        List<Event> events = eventRepository.findAll();
        return ResponseEntity.ok(events);
    }

    // 🔸 Register User for Event - Simplified Version
    @PostMapping("/register")
    public ResponseEntity<?> registerUserToEvent(
            @RequestParam Long userId,
            @RequestParam Long eventId
    ) {
        try {
            // For now, just check if user and event exist
            boolean userExists = userRepository.existsById(userId);
            boolean eventExists = eventRepository.existsById(eventId);

            if (!userExists) {
                return ResponseEntity.badRequest().body("User not found with ID: " + userId);
            }
            
            if (!eventExists) {
                return ResponseEntity.badRequest().body("Event not found with ID: " + eventId);
            }

            // For now, just return success without actually registering
            // TODO: Implement actual registration when User entity relationship is fixed
            return ResponseEntity.ok("User registration acknowledged for event " + eventId + " (simplified mode)");
            
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error registering user: " + e.getMessage());
        }
    }

    // 🔸 Get Participants of an Event
    @GetMapping("/{eventId}/participants")
    public ResponseEntity<?> getEventParticipants(@PathVariable Long eventId) {
        try {
            Event event = eventRepository.findById(eventId).orElse(null);
            if (event == null) {
                return ResponseEntity.badRequest().body("Event not found.");
            }

            List<User> participants = event.getParticipants();
            if (participants == null) {
                participants = new ArrayList<>();
            }
            
            // Remove password from response for security
            participants.forEach(p -> p.setPassword(null));
            return ResponseEntity.ok(participants);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error getting participants: " + e.getMessage());
        }
    }
}
