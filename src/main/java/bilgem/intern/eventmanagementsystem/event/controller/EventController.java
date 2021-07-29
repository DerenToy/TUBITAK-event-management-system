package bilgem.intern.eventmanagementsystem.event.controller;


import bilgem.intern.eventmanagementsystem.applyEvent.controller.response.EventRegistrationResponse;
import bilgem.intern.eventmanagementsystem.common.dto.MessageResponse;
import bilgem.intern.eventmanagementsystem.event.controller.request.AddEventRequest;
import bilgem.intern.eventmanagementsystem.event.controller.request.UpdateEventRequest;
import bilgem.intern.eventmanagementsystem.event.controller.response.EventQueryResponse;
import bilgem.intern.eventmanagementsystem.event.entity.Event;
import bilgem.intern.eventmanagementsystem.event.service.EventService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@RequestMapping("/events")
@Validated
public class EventController {

    // Dependency injection
    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }


    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping
    public MessageResponse addEvent(@Valid @RequestBody final AddEventRequest request){

            return eventService.addEvent(request.toEvent());

    }


    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/admin")
    public List<EventQueryResponse> getAllEvents() {
        return eventService.getAllEvents()
                .stream()
                .map(EventQueryResponse::new)
                .toList();

    }

    @GetMapping("/admin/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public EventQueryResponse getEventById(@PathVariable final Long id) {
        Event event = eventService.findEvent(id);
        return new EventQueryResponse(event);
    }



    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public MessageResponse updateEvent(@PathVariable Long id, @RequestBody @Valid UpdateEventRequest request) {
        return eventService.updateEvent(id, request.toEvent());

    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public MessageResponse deleteEvent(@PathVariable Long id) {
        return eventService.deleteEvent(id);
    }



    @GetMapping("/admin/participants")
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<EventRegistrationResponse> getParticipants() {
        return eventService.getParticipants()
                .stream()
                .map(EventRegistrationResponse::new)
                .toList();

    }


    @GetMapping("/user")
    @PreAuthorize("hasAuthority('USER')")
    public List<EventQueryResponse> getNotStartedEvents() {
        // aldığımız event objesini streamleyip eventqueryresponse'a map'liyoruz sonra onu list yapıyoruz
        return eventService.getNotStartedEvents()
                .stream()
                .map(EventQueryResponse::new)
                .toList();

    }



}
