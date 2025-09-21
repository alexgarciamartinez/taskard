package dev.agarcia.taskard.exceptions;

public class DuplicateResourceException extends RuntimeException {
    public DuplicateResourceException(String message) {

        super(message);
    }
}
