package bilgem.intern.eventmanagementsystem.event.entity;


import bilgem.intern.eventmanagementsystem.applyEvent.entity.EventRegistration;
import bilgem.intern.eventmanagementsystem.common.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Getter
@Accessors(fluent = true)
@AllArgsConstructor
@NoArgsConstructor
public class Event extends BaseEntity {

    private String eventName;
    private LocalDate startDate;
    private LocalDate finishDate;
    @Setter
    private Long quota;
    @Setter
    private Long numberOfParticipants= 0L; // kontenjanı takip edebilmek için böyle bir property tuttum

    private String imageUrl;

    public Event(String eventName, LocalDate startDate, LocalDate finishDate, Long quota, String imageUrl) {
        this.eventName = eventName;
        this.startDate = startDate;
        this.finishDate = finishDate;
        this.quota = quota;
        this.imageUrl = imageUrl;

    }

    @OneToMany(mappedBy = "event")
    Set<EventRegistration> registrations;

    public void updateEvent(final Event updatedEvent) {
        this.eventName = updatedEvent.eventName;
        this.startDate = updatedEvent.startDate;
        this.finishDate = updatedEvent.finishDate;
        this.quota = updatedEvent.quota;
        this.imageUrl = updatedEvent.imageUrl;
    }




}
