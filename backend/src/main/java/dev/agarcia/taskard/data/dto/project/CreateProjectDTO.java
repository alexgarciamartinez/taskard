package dev.agarcia.taskard.data.dto.project;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateProjectDTO {

    @NotBlank(message = "The project name is mandatory")
    private String name;
}
