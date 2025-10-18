package dev.agarcia.taskard.data.dto.task;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateTaskDTO {

    @NotNull(message = "The task ID can't be empty")
    private Long id;

    @NotBlank(message = "The title can't be empty")
    private String title;

    private String description;

    @NotNull(message = "The project ID can't be empty")
    private Long projectId;

    @NotNull(message = "The assignee ID can't be empty")
    private Long assigneeId;

    private LocalDate duedate;
}
