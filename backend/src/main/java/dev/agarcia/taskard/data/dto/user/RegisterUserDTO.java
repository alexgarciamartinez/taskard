package dev.agarcia.taskard.data.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterUserDTO {

    private String email;

    private String password;

    private String repeatPassword;

    private String name;
}
