package dev.agarcia.taskard.controller.invitation;

import dev.agarcia.taskard.data.dto.invitation.AcceptInvitationDTO;
import dev.agarcia.taskard.data.dto.invitation.CreateInvitationDTO;
import dev.agarcia.taskard.services.invitation.InvitationsService;
import org.aspectj.lang.annotation.DeclareWarning;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/invitation")
public class InvitationController {

    @Autowired
    private InvitationsService invitationsService;

    @PostMapping("/create")
    public ResponseEntity<?> createInvitation(@RequestBody CreateInvitationDTO body) {
        return this.invitationsService.createInvitation(body).toResponseEntity();
    }

    @GetMapping("/get-by-user")
    public ResponseEntity<?> getInvitationsByUser() {
        return this.invitationsService.getInvitationsByUser().toResponseEntity();
    }

    @PostMapping("/accept")
    public ResponseEntity<?> acceptInvitation(@RequestBody AcceptInvitationDTO body) {
        return this.invitationsService.acceptInvitation(body).toResponseEntity();
    }

    @DeleteMapping("/reject/{invitationId}")
    public ResponseEntity<?> rejectInvitation(@PathVariable Long invitationId) {
        return this.invitationsService.rejectInvitation(invitationId).toResponseEntity();
    }
}
