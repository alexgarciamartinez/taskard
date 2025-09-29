package dev.agarcia.taskard.data.dto.sprint;

import dev.agarcia.taskard.data.dto.task.TaskDTO;
import dev.agarcia.taskard.data.models.task.Task;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetSprintDTO {

    private Long id;

    private Integer sprintCounter;

    private List<TaskDTO> tasks;

    private LocalDate startDate;

    private LocalDate endDate;

    private boolean isStarted;
}
