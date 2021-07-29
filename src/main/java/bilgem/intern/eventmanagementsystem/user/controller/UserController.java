package bilgem.intern.eventmanagementsystem.user.controller;


import bilgem.intern.eventmanagementsystem.event.controller.response.EventQueryResponse;
import bilgem.intern.eventmanagementsystem.user.service.UserService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {

        this.userService = userService;
    }


    @PreAuthorize("hasAuthority('ADMIN')") // Admin yetkisi olanların yapabileceğini söylemiş oluyor
    @GetMapping("/user/enrolled-events/{username}")
    public List<EventQueryResponse> getUserRegisteredEvents(@PathVariable String username) {
        return userService.getUserRegisteredEvents(username).stream().map(EventQueryResponse::new).toList();

    }




}
