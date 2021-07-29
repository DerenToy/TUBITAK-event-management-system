package bilgem.intern.eventmanagementsystem.applyEvent.controller.request;


import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Getter
@RequiredArgsConstructor
@ToString
// Gelen isteğin validation kontrollerini yaptığımız yer
public class EventRegistrationRequest {

    @NotEmpty(message = "Identication number cannot be empty!")
    @Size(min = 11, max=11, message = "Identication number should be 11 characters!")
    private final String identificationNumber;

    @NotEmpty(message = "First name cannot be empty!")
    private final String firstName;

    @NotEmpty(message = "Last date cannot be empty!")
    private final String lastName;



}
