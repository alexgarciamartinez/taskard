package dev.agarcia.taskard.exceptions.controller;

import dev.agarcia.taskard.exceptions.DuplicateResourceException;
import dev.agarcia.taskard.exceptions.PasswordValidationException;
import dev.agarcia.taskard.exceptions.UserNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import org.modelmapper.internal.bytebuddy.dynamic.scaffold.MethodGraph;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<Map<String, Object>> handleDuplicateResource(
            DuplicateResourceException ex,
            HttpServletRequest request) {

        return new ResponseEntity<>(
                buildErrorBody(HttpStatus.CONFLICT, ex.getMessage(), request.getRequestURI()),
                HttpStatus.CONFLICT
        );
    }

    @ExceptionHandler(PasswordValidationException.class)
    public ResponseEntity<Map<String, Object>> handleInvalidPassword(
            PasswordValidationException ex,
            HttpServletRequest request) {

        return new ResponseEntity<>(
                buildErrorBody(HttpStatus.BAD_REQUEST, ex.getMessage(), request.getRequestURI()),
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleUserNotFound(
            UserNotFoundException ex,
            HttpServletRequest request) {

        return new ResponseEntity<>(
                buildErrorBody(HttpStatus.BAD_REQUEST, ex.getMessage(), request.getRequestURI()),
                HttpStatus.BAD_REQUEST
        );
    }

    private Map<String, Object>buildErrorBody(HttpStatus status, String message, String path) {
        Map<String, Object> body = new LinkedHashMap<>();

        body.put("timestamp", LocalDateTime.now());
        body.put("status", status.value());
        body.put("error", "Conflict");
        body.put("message", message);
        body.put("path", path);

        return body;
    }

}
