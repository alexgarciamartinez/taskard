package dev.agarcia.taskard.data.dto.invitation;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateInvitationDTO {

    private Long projectId;

    private String email;
}
