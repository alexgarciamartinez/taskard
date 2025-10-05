package dev.agarcia.taskard.data.dto.invitation;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateInvitationDTO {

    @NotNull(message = "The project ID can't be empty")
    private Long projectId;

    @NotBlank(message = "The email can't be empty")
    private String email;
}
