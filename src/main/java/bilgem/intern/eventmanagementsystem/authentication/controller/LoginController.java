package bilgem.intern.eventmanagementsystem.authentication.controller;

import bilgem.intern.eventmanagementsystem.authentication.controller.request.LoginRequest;
import bilgem.intern.eventmanagementsystem.authentication.service.LoginService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class LoginController {

    private final LoginService loginService;

    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping("/login")
    public String login(@Valid @RequestBody final LoginRequest loginRequest) {
        return loginService.login(loginRequest);
    }



}
