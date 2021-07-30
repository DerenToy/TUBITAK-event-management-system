package bilgem.intern.eventmanagementsystem.applyEvent.controller.response;

import bilgem.intern.eventmanagementsystem.applyEvent.entity.EventRegistration;
import bilgem.intern.eventmanagementsystem.event.entity.Event;
import lombok.Getter;


@Getter
// Gelen isteğe gönderilen yanıt
public class EventRegistrationResponse {
    private Long id;
    private String identificationNumber;
    private String firstName;
    private String lastName;
    private String registeredAt;
    private String eventName;
    private String username;


    public EventRegistrationResponse(final EventRegistration eventRegistration) {
        this.id = eventRegistration.getId();
        this.identificationNumber = eventRegistration.getIdentificationNumber();
        this.firstName = eventRegistration.getFirstName();
        this.lastName = eventRegistration.getLastName();
        this.registeredAt = String.valueOf(eventRegistration.getRegisteredAt());
        this.eventName = eventRegistration.getEvent().eventName();
        this.username = eventRegistration.getUser().getUsername();


    }



}
