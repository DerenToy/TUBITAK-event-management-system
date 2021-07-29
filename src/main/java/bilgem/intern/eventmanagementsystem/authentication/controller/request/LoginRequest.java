package bilgem.intern.eventmanagementsystem.authentication.controller.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.NotEmpty;


@Getter
@RequiredArgsConstructor
// Back-end'den gelen bilgilerin validation kontrollerinin yapıldığı class
public class LoginRequest {

        @NotEmpty(message = "Username cannot be empty!")
        private final String username;
        @NotEmpty(message = "Password cannot be empty!")
        private final String password;


}
