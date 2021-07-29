package bilgem.intern.eventmanagementsystem.applyEvent.service;

import bilgem.intern.eventmanagementsystem.applyEvent.controller.request.EventRegistrationRequest;
import bilgem.intern.eventmanagementsystem.applyEvent.entity.EventRegistration;
import bilgem.intern.eventmanagementsystem.applyEvent.repository.EventRegistrationRepository;
import bilgem.intern.eventmanagementsystem.common.dto.MessageResponse;
import bilgem.intern.eventmanagementsystem.common.enums.MessageType;
import bilgem.intern.eventmanagementsystem.emailSend.service.EmailService;
import bilgem.intern.eventmanagementsystem.event.entity.Event;
import bilgem.intern.eventmanagementsystem.event.repository.EventRepository;
import bilgem.intern.eventmanagementsystem.user.entity.Users;
import bilgem.intern.eventmanagementsystem.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Set;

@Service
public class EventRegistrationService {

    private final UserRepository userRepository;
    private final EventRepository eventRepository;
    private final EventRegistrationRepository eventRegistrationRepository;
    private final EmailService emailService;

    private static final String USER_ALREADY_ENROLLED_THIS_EVENT = "User with identificaion number %s is already enrolled this event!";
    private static final String USER_IS_SUCCESFULLY_ADDED = "User with identificaion number %s is successfully added to this event";
    private static final String  EVENT_QUOTA_IS_FULL = "Event's quota is full, you can not register this event!";
    private static final String EMAIL_COULD_NOT_BE_SENT = "email could not be sent!";
    private static final String EMAIL_SENT_SUCCESSFULLY = "email sent successfuly!";

    public EventRegistrationService(UserRepository userRepository, EventRepository eventRepository, EventRegistrationRepository eventRegistrationRepository, EmailService emailService) {
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
        this.eventRegistrationRepository = eventRegistrationRepository;
        this.emailService = emailService;
    }


    public MessageResponse applyEvent(EventRegistrationRequest request, String username, Long eventId) {

        Users user = userRepository.getByUsername(username);
        Event event  = eventRepository.getById(eventId);
        Set<EventRegistration> registrations = eventRegistrationRepository.getEventRegistrationsByEvent(event);

        // Aynı tc kimlik numarası ile bir etkinliğe birden fazla başvuru yapılıp yapılmadığını ve kontenjanın dolup
        // dolmadığını kontrol etme işlemlerini burada yaptım.
        if(registrations.stream().map(EventRegistration::getIdentificationNumber).toList().contains(request.getIdentificationNumber())){
            return new MessageResponse(MessageType.ERROR, USER_ALREADY_ENROLLED_THIS_EVENT.formatted(request.getIdentificationNumber()));
        }else if(event.quota() <= event.numberOfParticipants()){
            return new MessageResponse(MessageType.ERROR, EVENT_QUOTA_IS_FULL);

        }
        // EventRegistration objesi yaratılır ve repository ile veri tabanına kaydedilir.
        EventRegistration eventRegistration =new EventRegistration(user,event, LocalDate.now(),
                request.getIdentificationNumber(),
                request.getFirstName(), request.getLastName());
        eventRegistrationRepository.save(eventRegistration);

        // Etkinliğe kayıt tamamlandıktan sonra etkinlikteki mevcut katılımcı sayısı arttırılarak etkinlik güncellenir.
        Long numOfParticipants = event.numberOfParticipants();
        event.numberOfParticipants(numOfParticipants+1);
        eventRepository.save(event);

        // Etkinliğe katılım tamamlandıktan sonra mail gönderilebilemsi için emailService kullanılır.
        MessageType message = emailService.sendEmail(request, user, event);

        if (message == MessageType.SUCCESS){
            return  new MessageResponse(MessageType.SUCCESS,USER_IS_SUCCESFULLY_ADDED.formatted(request.getIdentificationNumber()) +" and " + EMAIL_SENT_SUCCESSFULLY);
        }else{
            return  new MessageResponse(MessageType.ERROR,USER_IS_SUCCESFULLY_ADDED.formatted(request.getIdentificationNumber()) + " but " + EMAIL_COULD_NOT_BE_SENT);
        }



    }
}
