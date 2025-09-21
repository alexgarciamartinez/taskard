package dev.agarcia.taskard.data.dto.task;

import dev.agarcia.taskard.data.enums.Priority;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateTaskDTO {

    private String title;

    private String description;

    private Long projectId;

    private Long assigneeId;

    private LocalDate duedate;

    private Priority priority;
}
