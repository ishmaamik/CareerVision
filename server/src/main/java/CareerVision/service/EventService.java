package CareerVision.service;

import CareerVision.model.Event;
import CareerVision.model.Participant;
import CareerVision.model.User;
import CareerVision.repository.EventRepository;
import CareerVision.repository.ParticipantRepository;
import CareerVision.repository.UserRepository;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class EventService {
    private static final Logger logger = LoggerFactory.getLogger(EventService.class);

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private ParticipantRepository participantRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    // Create a new event
    @Transactional
    public Event createEvent(Event event) {
        // Validate event details
        validateEventDetails(event);

        try {
            // Save the event
            Event savedEvent = eventRepository.save(event);
            
            logger.info("Event created successfully: {}", savedEvent);

            // Send notification to organizer
            try {
                emailService.sendEventCreationConfirmation(savedEvent);
            } catch (Exception e) {
                logger.error("Failed to send event creation email", e);
            }

            return savedEvent;
        } catch (Exception e) {
            logger.error("Error creating event", e);
            throw new RuntimeException("Failed to create event", e);
        }
    }

    // Validate event details before saving
    private void validateEventDetails(Event event) {
        // Check for null or empty required fields
        if (event == null) {
            throw new IllegalArgumentException("Event cannot be null");
        }

        if (event.getTitle() == null || event.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("Event title is required");
        }

        if (event.getDescription() == null || event.getDescription().trim().isEmpty()) {
            throw new IllegalArgumentException("Event description is required");
        }

        if (event.getEventDate() == null) {
            throw new IllegalArgumentException("Event date is required");
        }

        if (event.getLocation() == null || event.getLocation().trim().isEmpty()) {
            throw new IllegalArgumentException("Event location is required");
        }

        if (event.getOrganizerEmail() == null || event.getOrganizerEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("Organizer email is required");
        }

        // Validate event date
        if (event.getEventDate().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Event date cannot be in the past");
        }

        // Set default event type if not provided
        if (event.getEventType() == null) {
            event.setEventType(Event.EventType.WORKSHOP);
        }
    }

    // Register a user for an event
    @Transactional
    public Participant registerForEvent(Long eventId, Long userId) {
        // Find event and user
        Event event = eventRepository.findById(eventId)
            .orElseThrow(() -> new RuntimeException("Event not found"));
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        // Check if user is already registered
        Optional<Participant> existingParticipant = participantRepository
            .findByEventIdAndUserId(eventId, userId);
        
        if (existingParticipant.isPresent()) {
            throw new RuntimeException("User already registered for this event");
        }

        // Create new participant
        Participant participant = new Participant(event, user);
        Participant savedParticipant = participantRepository.save(participant);

        // Send registration confirmation email
        emailService.sendEventRegistrationConfirmation(event, user);

        return savedParticipant;
    }

    // Get all upcoming events
    @Transactional(readOnly = true)
    public List<Event> getUpcomingEvents() {
        LocalDateTime now = LocalDateTime.now();
        logger.info("Fetching upcoming events from current time: {}", now);
        
        List<Event> events = eventRepository.findUpcomingPublicEvents(now);
        
        logger.info("Found {} upcoming events", events.size());
        for (Event event : events) {
            logger.debug("Event: id={}, title={}, date={}", 
                event.getId(), event.getTitle(), event.getEventDate());
        }
        
        return events;
    }

    // Get event participants
    @Transactional(readOnly = true)
    public List<Participant> getEventParticipants(Long eventId) {
        return participantRepository.findByEventId(eventId);
    }

    // Cancel event registration
    @Transactional
    public void cancelEventRegistration(Long eventId, Long userId) {
        Participant participant = participantRepository
            .findByEventIdAndUserId(eventId, userId)
            .orElseThrow(() -> new RuntimeException("Registration not found"));

        participant.setStatus(Participant.RegistrationStatus.CANCELLED);
        participantRepository.save(participant);

        // Send cancellation email
        emailService.sendEventCancellationConfirmation(
            participant.getEvent(), 
            participant.getUser()
        );
    }

    // Get events by type
    @Transactional(readOnly = true)
    public List<Event> getEventsByType(Event.EventType eventType) {
        // Validate input
        if (eventType == null) {
            logger.error("Attempted to fetch events with null event type");
            throw new IllegalArgumentException("Event type cannot be null");
        }

        try {
            // Fetch events by type
            List<Event> events = eventRepository.findByEventType(eventType);
            
            // Log details about retrieved events
            logger.info("Retrieved {} events of type {}", events.size(), eventType);
            
            // Log details of each event for debugging
            for (Event event : events) {
                // Eagerly load participants
                if (event.getParticipants() != null) {
                    event.getParticipants().size(); // Force initialization
                }
                
                logger.debug("Event details: id={}, title={}, date={}, location={}, participants={}", 
                    event.getId(), event.getTitle(), event.getEventDate(), event.getLocation(), 
                    event.getParticipants() != null ? event.getParticipants().size() : 0
                );
            }
            
            return events;
        } catch (Exception e) {
            // Log the full error details
            logger.error("Error retrieving events of type " + eventType, e);
            
            // Rethrow with a more informative message
            throw new RuntimeException("Failed to fetch events of type " + eventType, e);
        }
    }
}
