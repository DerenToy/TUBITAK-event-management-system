package bilgem.intern.eventmanagementsystem.event.controller.request;

import bilgem.intern.eventmanagementsystem.event.entity.Event;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import java.time.LocalDate;


@RequiredArgsConstructor
@Getter
@ToString
public class UpdateEventRequest {

    private final String eventName;

    private final String startDate;

    private final String finishDate;

    private final Long quota;

    private final String imageUrl;


    public Event toEvent(){
        LocalDate startDate = LocalDate.parse(getStartDate());
        LocalDate finishDate = LocalDate.parse(getFinishDate());
        return new Event(eventName, startDate, finishDate, quota, imageUrl);
    }

}
