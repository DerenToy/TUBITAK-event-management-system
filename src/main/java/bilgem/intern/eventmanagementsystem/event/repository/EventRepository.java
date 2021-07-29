package bilgem.intern.eventmanagementsystem.event.repository;

import bilgem.intern.eventmanagementsystem.event.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

// Veri tabanı ile iletişimi sağlar
public interface EventRepository extends JpaRepository<Event, Long> {

    boolean existsByEventName(String eventName);

    Optional<Event> findByEventName(String eventName);

    @Query("select b  from Event b where b.startDate > CURRENT_DATE")
    List<Event> findNotStartedEvents();





}
