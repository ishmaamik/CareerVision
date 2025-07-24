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

    // 🔸 Register User for Event
    @PostMapping("/register")
    public ResponseEntity<?> registerUserToEvent(
            @RequestParam Long userId,
            @RequestParam Long eventId
    ) {
        User user = userRepository.findById(userId).orElse(null);
        Event event = eventRepository.findById(eventId).orElse(null);

        if (user == null || event == null) {
            return ResponseEntity.badRequest().body("Invalid user ID or event ID.");
        }

        if (!event.getParticipants().contains(user)) {
            event.getParticipants().add(user);
            eventRepository.save(event);
            return ResponseEntity.ok("User registered for the event successfully.");
        } else {
            return ResponseEntity.badRequest().body("User already registered for this event.");
        }
    }

    // 🔸 Get Participants of an Event
    @GetMapping("/{eventId}/participants")
    public ResponseEntity<?> getEventParticipants(@PathVariable Long eventId) {
        Event event = eventRepository.findById(eventId).orElse(null);
        if (event == null) {
            return ResponseEntity.badRequest().body("Event not found.");
        }

        List<User> participants = event.getParticipants();
        participants.forEach(p -> p.setPassword(null));
        return ResponseEntity.ok(participants);
    }
}
