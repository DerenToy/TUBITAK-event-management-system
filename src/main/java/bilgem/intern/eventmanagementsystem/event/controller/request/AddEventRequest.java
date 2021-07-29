package bilgem.intern.eventmanagementsystem.event.controller.request;


import bilgem.intern.eventmanagementsystem.event.entity.Event;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.*;
import java.time.LocalDate;

@RequiredArgsConstructor
@Getter
@ToString
// Validation işlerini request'te yapıyoruz..
public class AddEventRequest {

    @NotEmpty(message = "Event name cannot be empty!")
    private final String eventName;

    @NotEmpty(message = "Start date cannot be empty!")
    private final String startDate;

    @NotEmpty(message = "Finish date cannot be empty!")
    private final String finishDate;

    @Range(min=1, message = "Quota must be 1 or more!")
    private final Long quota;


    private final String imageUrl;


    public Event toEvent() {
        LocalDate startDate = LocalDate.parse(getStartDate());
        LocalDate finishDate = LocalDate.parse(getFinishDate());

        return new Event(eventName, startDate, finishDate, quota, imageUrl);
    }


}
