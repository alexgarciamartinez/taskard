package dev.agarcia.taskard.data.dto.task;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MoveTaskToSprintDTO {

    private Long taskId;

    private Long sprintId;
}
