package dev.agarcia.taskard.data.dto.task;

import dev.agarcia.taskard.data.enums.Priority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateTaskDTO {

    @NotBlank(message = "The title can't be empty")
    private String title;

    private String description;

    @NotNull(message = "The project ID can't be empty")
    private Long projectId;

    @NotNull(message = "The assignee ID can't be empty")
    private Long assigneeId;

    private LocalDate duedate;

    @NotNull(message = "The priority can't be empty")
    private Priority priority;
}
