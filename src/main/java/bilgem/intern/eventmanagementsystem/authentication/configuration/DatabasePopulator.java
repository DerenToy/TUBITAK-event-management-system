package bilgem.intern.eventmanagementsystem.authentication.configuration;


import bilgem.intern.eventmanagementsystem.authentication.entity.Authority;
import bilgem.intern.eventmanagementsystem.authentication.repository.AuthorityRepository;
import bilgem.intern.eventmanagementsystem.applyEvent.entity.EventRegistration;
import bilgem.intern.eventmanagementsystem.event.entity.Event;
import bilgem.intern.eventmanagementsystem.event.repository.EventRepository;
import bilgem.intern.eventmanagementsystem.user.entity.User;
import bilgem.intern.eventmanagementsystem.user.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Component
// Hard-coding şekilde veri tabanına obje eklediğim class
public class DatabasePopulator {

    private final AuthorityRepository authorityRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EventRepository eventRepository;

    public DatabasePopulator(final AuthorityRepository authorityRepository,
                             final UserRepository customUserRepository,
                             final PasswordEncoder passwordEncoder, EventRepository eventRepository, EventRepository eventRepository1) {
        this.authorityRepository = authorityRepository;
        this.userRepository = customUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.eventRepository = eventRepository1;
    }

    @Transactional
    public void populateDatabase() {
        Authority userAuthority = authorityRepository.save(new Authority("USER", new HashSet<>()));
        Authority adminAuthority = authorityRepository.save(new Authority("ADMIN", new HashSet<>()));
        Set<EventRegistration> registrations = new HashSet<EventRegistration>();
        User admin = new User("derentoy@gmail.com", "admin", passwordEncoder.encode("admin"), registrations, Set.of(userAuthority, adminAuthority));
        userRepository.save(admin);

        User user = new User("derentoy@gmail.com", "user", passwordEncoder.encode("user") , registrations, Set.of(userAuthority));
        userRepository.save(user);

        User user2 = new User("derentoy@gmail.com", "user2", passwordEncoder.encode("user2") , registrations, Set.of(userAuthority));
        userRepository.save(user2);

        Event event1 = new Event("Kadife Çiçekleri", LocalDate.parse("2021-09-09"), LocalDate.parse("2021-10-10"), 1L,"http://ast.gov.tr/Uploads/50f8d5afa99248af8e444c48c6578643.jpg");
        Event event2 = new Event("Düğün Hatırası", LocalDate.parse("2022-01-01"), LocalDate.parse("2025-02-02"), 2L, "http://ast.gov.tr/Uploads/55928829185e423bbfe3205310d1c40a.jpeg");

        eventRepository.save(event1);
        eventRepository.save(event2);

    }
}