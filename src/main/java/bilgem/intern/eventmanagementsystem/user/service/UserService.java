package bilgem.intern.eventmanagementsystem.user.service;


import bilgem.intern.eventmanagementsystem.event.entity.Event;
import bilgem.intern.eventmanagementsystem.applyEvent.entity.EventRegistration;
import bilgem.intern.eventmanagementsystem.applyEvent.repository.EventRegistrationRepository;
import bilgem.intern.eventmanagementsystem.event.repository.EventRepository;
import bilgem.intern.eventmanagementsystem.user.entity.User;
import bilgem.intern.eventmanagementsystem.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Set;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final EventRegistrationRepository eventRegistrationRepository;


    public UserService(UserRepository userRepository, EventRepository eventRepository, EventRegistrationRepository eventRegistrationRepository) {
        this.userRepository = userRepository;
        this.eventRegistrationRepository = eventRegistrationRepository;
    }

    // EventRegistration'ı stream'leyip Event'e map'leyip list olarak alıyoruz..
    // Kullanıcının kayıt olduğu event'leri almasını sağlar.
    public List<Event> getUserRegisteredEvents(String username){
        User user = userRepository.getByUsername(username);
        Set<EventRegistration> registrations= eventRegistrationRepository.getEventRegistrationsByUser(user);
        return registrations
                .stream()
                .map(EventRegistration::getEvent)
                .toList();


    }


}
