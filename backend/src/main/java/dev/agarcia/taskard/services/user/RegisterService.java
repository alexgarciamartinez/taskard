package dev.agarcia.taskard.services.user;

import dev.agarcia.taskard.data.dto.user.RegisterUserDTO;
import dev.agarcia.taskard.data.models.user.User;
import dev.agarcia.taskard.data.models.user.UserService;
import dev.agarcia.taskard.data.responses.Response;
import dev.agarcia.taskard.data.responses.ResponseState;
import dev.agarcia.taskard.exceptions.DuplicateResourceException;
import dev.agarcia.taskard.exceptions.PasswordValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RegisterService {

    @Autowired
    private PasswordEncoder bpe;

    @Autowired
    private UserService userServiceDAO;

    public Response registerUser(RegisterUserDTO body) {

        Optional<User> existingUser = userServiceDAO.getByEmail(body.getEmail());
        if (existingUser.isPresent()) {
            throw new DuplicateResourceException("The email " + body.getEmail() + " is already in use");
        }

        if (!validatePassword(body.getPassword(), body.getRepeatPassword())) {
            throw new PasswordValidationException("The password does not match or does not meet the requirements");
        }

        try {

            User user = User.builder()
                    .email(body.getEmail())
                    .password(this.bpe.encode(body.getPassword()))
                    .name(body.getName())
                    .build();

            this.userServiceDAO.save(user);

            return new Response(ResponseState.OK, "Usuario registrado con éxito");
        } catch(Exception e) {
            return new Response(ResponseState.ERROR, "Error al registrar usuario => " + e.getMessage());
        }
    }

    public boolean validatePassword(String password1, String password2) {
        return password1.equals(password2);
    }
}
