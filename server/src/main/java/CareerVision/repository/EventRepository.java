package CareerVision.repository;

import CareerVision.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    // Find events by type
    List<Event> findByEventType(Event.EventType eventType);

    // Find upcoming public events
    @Query("SELECT e FROM Event e WHERE e.eventDate > :currentDate AND e.isPublic = true ORDER BY e.eventDate ASC")
    List<Event> findUpcomingPublicEvents(@Param("currentDate") LocalDateTime currentDate);

    // Find events by organizer email
    List<Event> findByOrganizerEmail(String organizerEmail);

    // Find events within a date range
    @Query("SELECT e FROM Event e WHERE e.eventDate BETWEEN :startDate AND :endDate")
    List<Event> findEventsBetweenDates(
        @Param("startDate") LocalDateTime startDate, 
        @Param("endDate") LocalDateTime endDate
    );

    // Count of events by type
    long countByEventType(Event.EventType eventType);
}