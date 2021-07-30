package bilgem.intern.eventmanagementsystem.event.controller.response;


import bilgem.intern.eventmanagementsystem.event.entity.Event;
import lombok.Getter;
import java.time.LocalDate;

@Getter
public class EventQueryResponse {

    private long id;
    private String eventName;
    private LocalDate startDate;
    private LocalDate finishDate;
    private Long quota;
    private String imageUrl;
    private Long numberOfParticipants;


    public EventQueryResponse(final Event event) {
        this.id = event.getId();
        this.eventName = event.eventName();
        this.startDate = event.startDate();
        this.finishDate = event.finishDate();
        this.quota = event.quota();
        this.imageUrl = event.imageUrl();
        this.numberOfParticipants = event.numberOfParticipants();


    }

}
