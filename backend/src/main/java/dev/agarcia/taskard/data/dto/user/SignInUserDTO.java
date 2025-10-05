package dev.agarcia.taskard.data.dto.user;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignInUserDTO {

    @NotBlank(message = "The email can't be empty")
    private String email;

    @NotBlank(message = "The password can't be empty")
    private String password;
}