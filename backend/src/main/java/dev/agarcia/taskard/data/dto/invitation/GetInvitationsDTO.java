package dev.agarcia.taskard.data.dto.invitation;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetInvitationsDTO {

    private Long id;

    private GetInviterDTO inviter;

    private GetInviterProjectDTO project;
}
