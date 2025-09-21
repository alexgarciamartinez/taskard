package dev.agarcia.taskard.data.dto.task;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetAssigneeDTO {

    private Long id;

    private String email;

    private String name;
}
