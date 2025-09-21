package dev.agarcia.taskard.data.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Response {

    private ResponseState status;
    private Object body;

    public ResponseEntity<Response> toResponseEntity() {
        HttpStatus httpStatus;

        switch (this.status) {
            case CREATED_USER -> httpStatus = HttpStatus.CREATED;
            case OK -> httpStatus = HttpStatus.OK;
            case ERROR -> httpStatus = HttpStatus.BAD_REQUEST;
            default -> httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return ResponseEntity.status(httpStatus).body(this);
    }
}
