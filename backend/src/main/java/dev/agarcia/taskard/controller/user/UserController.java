package dev.agarcia.taskard.controller.user;

import dev.agarcia.taskard.data.dto.user.RegisterUserDTO;
import dev.agarcia.taskard.data.dto.user.SignInUserDTO;
import dev.agarcia.taskard.services.sign_in.SignInService;
import dev.agarcia.taskard.services.user.RegisterService;
import dev.agarcia.taskard.services.user.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private RegisterService registerService;

    @Autowired
    private SignInService signInService;

    @Autowired
    private UsersService usersServie;

    @PostMapping("/register")
    public ResponseEntity<?> registerRequest(@RequestBody RegisterUserDTO rb) {
        return registerService.registerUser(rb).toResponseEntity();
    }

    @PostMapping("/sign-in")
    public ResponseEntity<?> signInRequest(@RequestBody SignInUserDTO body) {
        return signInService.signIn(body).toResponseEntity();
    }

    @GetMapping("/get-by-project/{projectId}")
    public ResponseEntity<?> getByProject(@PathVariable Long projectId) {
        return usersServie.getUsersByProject(projectId).toResponseEntity();
    }
}
