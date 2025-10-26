package dev.agarcia.taskard.data.dto.sprint;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateSprintDTO {

    @NotNull(message = "Project id is required!")
    private Long projectId;

    @NotNull(message = "Start date is required")
    private LocalDate startDate;

    @NotNull(message = "Enda date is required")
    private LocalDate endDate;

}
