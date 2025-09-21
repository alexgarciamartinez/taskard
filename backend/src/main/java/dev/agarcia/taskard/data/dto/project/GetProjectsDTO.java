package dev.agarcia.taskard.data.dto.project;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetProjectsDTO {

    private Long id;

    private String name;
}
