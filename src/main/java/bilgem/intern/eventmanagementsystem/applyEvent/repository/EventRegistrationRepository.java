package bilgem.intern.eventmanagementsystem.applyEvent.repository;


import bilgem.intern.eventmanagementsystem.event.entity.Event;
import bilgem.intern.eventmanagementsystem.applyEvent.entity.EventRegistration;
import bilgem.intern.eventmanagementsystem.user.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

// Veri tabanı ile bağlantı kurduğumuz yer
public interface EventRegistrationRepository extends JpaRepository<EventRegistration, Long> {

    Set<EventRegistration> getEventRegistrationsByUser(Users user);

    Set<EventRegistration> getEventRegistrationsByEvent(Event event);


}
