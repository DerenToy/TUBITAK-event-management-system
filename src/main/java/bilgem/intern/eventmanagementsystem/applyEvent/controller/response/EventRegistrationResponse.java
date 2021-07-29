package bilgem.intern.eventmanagementsystem.applyEvent.controller.response;

import bilgem.intern.eventmanagementsystem.applyEvent.entity.EventRegistration;
import lombok.Getter;


@Getter
// Gelen isteğe gönderilen yanıt
public class EventRegistrationResponse {
    private Long id;
    private String identificationNumber;
    private String firstName;
    private String lastName;
    private String registeredAt;


    public EventRegistrationResponse(final EventRegistration eventRegistration) {
        this.id = eventRegistration.getId();
        this.identificationNumber = eventRegistration.getIdentificationNumber();
        this.firstName = eventRegistration.getFirstName();
        this.lastName = eventRegistration.getLastName();
        this.registeredAt = String.valueOf(eventRegistration.getRegisteredAt());



    }



}
