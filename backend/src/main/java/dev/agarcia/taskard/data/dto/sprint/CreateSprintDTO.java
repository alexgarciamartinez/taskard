package dev.agarcia.taskard.data.dto.sprint;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateSprintDTO {

    @NotNull(message = "Project id is required!")
    private Long projectId;

}
