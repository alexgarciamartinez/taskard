package dev.agarcia.taskard.data.dto.task;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateTaskDTO {

    private Long id;

    private String title;

    private String description;

    private Long projectId;

    private Long assigneeId;

    private LocalDate duedate;
}
