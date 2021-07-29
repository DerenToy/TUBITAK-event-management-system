package bilgem.intern.eventmanagementsystem.authentication.service;

import bilgem.intern.eventmanagementsystem.authentication.jwt.JwtUtil;
import bilgem.intern.eventmanagementsystem.authentication.controller.request.LoginRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;


@Service
public class LoginService {


    @Value("${security.jwt.secret-key}")
    private String secretKey;

    private final AuthenticationManager authenticationManager;

    public LoginService(final AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    public String login(LoginRequest loginRequest) {
        var token = new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword());

        try {
            Authentication authenticatedToken = authenticationManager.authenticate(token);
            return JwtUtil.generateToken(authenticatedToken, secretKey);
        } catch (AuthenticationException ignored) {

        }
        return null;
    }



}