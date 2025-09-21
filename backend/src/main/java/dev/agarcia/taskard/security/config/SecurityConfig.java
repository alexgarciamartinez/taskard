package dev.agarcia.taskard.security.config;

import dev.agarcia.taskard.security.JwtService;
import dev.agarcia.taskard.security.filters.CorsFilter;
import dev.agarcia.taskard.security.filters.JwtRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityFilterAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Autowired
    private CorsFilter corsFilter;

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(
                (csrf) -> {csrf.disable();}
        )
                .authorizeHttpRequests(
                        (req) -> {
                            req
                                    .requestMatchers("/api/user/**").permitAll()
                                    .requestMatchers("/api/project/**").authenticated()
                                    .requestMatchers("/api/task/**").authenticated()
                                    .requestMatchers("/api/invitation/**").authenticated()
                                    .anyRequest().denyAll();
                        }
                )
                .cors(
                        (cors) -> {cors.disable();}
                )
                .addFilterBefore(
                        jwtRequestFilter,
                        UsernamePasswordAuthenticationFilter.class
                ).addFilterBefore(
                        corsFilter,
                        JwtRequestFilter.class
                )
                .sessionManagement(
                        (session) -> {
                            session.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
                        }
                );
        return http.build();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
