package bilgem.intern.eventmanagementsystem.event.service;

import bilgem.intern.eventmanagementsystem.applyEvent.entity.EventRegistration;
import bilgem.intern.eventmanagementsystem.applyEvent.repository.EventRegistrationRepository;
import bilgem.intern.eventmanagementsystem.common.dto.MessageResponse;
import bilgem.intern.eventmanagementsystem.common.enums.MessageType;
import bilgem.intern.eventmanagementsystem.event.entity.Event;
import bilgem.intern.eventmanagementsystem.event.repository.EventRepository;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Service
public class EventService {

    public static LocalDate CURRENT_DATE = LocalDate.now();
    private final EventRepository eventRepository;
    private final EventRegistrationRepository eventRegistrationRepository;

    private static final String EVENT_ADDED_MESSAGE = "Event with name %s has been added successfully!";
    private static final String EVENT_ALREADY_EXISTS_MESSAGE = "Event with name %s already exists!";
    private final static String EVENT_DOESNT_EXIST_ID_MESSAGE = "Event with id %s does not exist!";
    private static final String START_DATE_MUST_CAME_BEFORE_FINISH_DATE = "The start date of the event must come before finish date!";
    private static final String EVENT_UPDATED_MESSAGE = "Event with id %s has been updated successfully!";
    private static final String EVENT_DELETED_MESSAGE = "Event with id %s has been deleted successfully!";
    private static final String EVENT_CANNOT_BE_ADDED = "The start date of the event has passed, you can not add this event!";
    private static final String EVENT_CANNOT_BE_UPDATED = "The start date of the event has passed, you can not update this event!";
    private static final String EVENT_CANNOT_BE_DELETED = "The start date of the event has passed, you can not delete this event!";

    public EventService(EventRepository eventRepository, EventRegistrationRepository eventRegistrationRepository) {
        this.eventRepository = eventRepository;
        this.eventRegistrationRepository = eventRegistrationRepository;
    }

    public MessageResponse addEvent(Event newEvent) {
        if (eventRepository.existsByEventName(newEvent.eventName())) {
            return new MessageResponse(MessageType.ERROR, eventAlreadyExistsMessage(newEvent.eventName()));
        }else if(newEvent.startDate().isAfter(newEvent.finishDate())){
            return new MessageResponse(MessageType.ERROR, START_DATE_MUST_CAME_BEFORE_FINISH_DATE);

        }/*else if(newEvent.startDate().isBefore(CURRENT_DATE)){
            return new MessageResponse(MessageType.ERROR, EVENT_CANNOT_BE_ADDED);

        }
 */
        eventRepository.save(newEvent);
        return new MessageResponse(MessageType.SUCCESS, eventAddedMessage(newEvent.eventName()));

    }

    private String eventAlreadyExistsMessage(final String eventName) {
        return EVENT_ALREADY_EXISTS_MESSAGE.formatted(eventName);
    }

    private String eventAddedMessage(final String eventName) {
        return EVENT_ADDED_MESSAGE.formatted(eventName);
    }


    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }


    public MessageResponse updateEvent(final Long id, final Event updatedEvent) {
        Event eventFromDB = findEvent(id);

        if(eventFromDB.startDate().isBefore((CURRENT_DATE))){
            return new MessageResponse(MessageType.ERROR, EVENT_CANNOT_BE_UPDATED);

        }else if(!updatedEvent.eventName().equals(eventFromDB.eventName()) && eventRepository.existsByEventName(updatedEvent.eventName()) ){
            return new MessageResponse(MessageType.ERROR, EVENT_ALREADY_EXISTS_MESSAGE.formatted(updatedEvent.eventName()));
        }else if(updatedEvent.startDate().isAfter(updatedEvent.finishDate())){
            return new MessageResponse(MessageType.ERROR, START_DATE_MUST_CAME_BEFORE_FINISH_DATE);

        }

        eventFromDB.updateEvent(updatedEvent);
        eventRepository.save(eventFromDB);
        return new MessageResponse(MessageType.SUCCESS, EVENT_UPDATED_MESSAGE.formatted(id));
    }

    public MessageResponse deleteEvent(Long id) {
        Event eventFromDB = findEvent(id);

        if (!eventRepository.existsById(id)) {
            return new MessageResponse(MessageType.ERROR, EVENT_DOESNT_EXIST_ID_MESSAGE.formatted(id));
        } else if (eventFromDB.startDate().isBefore((CURRENT_DATE)) ){
            return new MessageResponse(MessageType.ERROR, EVENT_CANNOT_BE_DELETED);
        }

        try {
            Set<EventRegistration> eventRegistrationList = eventRegistrationRepository.getEventRegistrationsByEvent(eventFromDB);
            eventRegistrationList.forEach(eventRegistrationRepository::delete);

        }
        catch(Exception ignored){

        }
        eventRepository.deleteById(id);
        return new MessageResponse(MessageType.SUCCESS, EVENT_DELETED_MESSAGE.formatted(id));
        }


   public Event findEvent (Long id){
        return eventRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(EVENT_DOESNT_EXIST_ID_MESSAGE.formatted(id)));
    }


    public List<Event> getNotStartedEvents() {
        return eventRepository.findNotStartedEvents();
    }

    public List<EventRegistration> getParticipants() {
        return eventRegistrationRepository.findAll();
    }
}

