package dev.agarcia.taskard.data.dto.user;

import dev.agarcia.taskard.data.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetUsersByProjectDTO {

    private Long id;

    private String name;

    private String email;

    private Role role;
}
