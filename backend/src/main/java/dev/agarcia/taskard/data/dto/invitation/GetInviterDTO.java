package dev.agarcia.taskard.data.dto.invitation;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetInviterDTO {

    private Long id;

    private String name;

    private String email;
}
