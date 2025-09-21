package dev.agarcia.taskard.services.sign_in;

import dev.agarcia.taskard.data.dto.user.SignInUserDTO;
import dev.agarcia.taskard.data.responses.Response;
import dev.agarcia.taskard.data.responses.ResponseState;
import dev.agarcia.taskard.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class SignInService {

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtService jwtService;

    public Response signIn(SignInUserDTO body) {
        try {
            authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            body.getEmail(),
                            body.getPassword()
                    )
            );

            UserDetails userDetails = userDetailsService.loadUserByUsername(body.getEmail());

            String token = jwtService.generateToken(userDetails.getUsername());

            return new Response(ResponseState.OK, token);

        } catch(Exception e) {
            return new Response(ResponseState.ERROR, e.getMessage());
        }
    }
}
