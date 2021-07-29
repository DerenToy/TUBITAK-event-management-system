package bilgem.intern.eventmanagementsystem.applyEvent.controller;

import bilgem.intern.eventmanagementsystem.applyEvent.controller.request.EventRegistrationRequest;
import bilgem.intern.eventmanagementsystem.applyEvent.service.EventRegistrationService;
import bilgem.intern.eventmanagementsystem.common.dto.MessageResponse;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
// 3000 portundan uygulamaya gelen isteklere izin verilebilmesi için CrossOrigin kullandım.
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class EventRegistrationController {

    private final EventRegistrationService eventRegistrationService;

    public EventRegistrationController(EventRegistrationService eventRegistrationService) {
        this.eventRegistrationService = eventRegistrationService;
    }

    @PostMapping("/{username}/apply-event/{eventId}")
    public MessageResponse applyEvent(@PathVariable String username,
                                      @Valid @RequestBody EventRegistrationRequest request, @PathVariable Long eventId){
    // Controller'a gelen istekler request dosyasında herhangi bir valdiation'a takılmadıysa service'deki fonksiyona gönderilir.
        return eventRegistrationService.applyEvent(request,username,eventId);

    }






}
