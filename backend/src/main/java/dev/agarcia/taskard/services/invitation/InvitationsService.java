package dev.agarcia.taskard.services.invitation;

import dev.agarcia.taskard.data.dto.invitation.AcceptInvitationDTO;
import dev.agarcia.taskard.data.dto.invitation.CreateInvitationDTO;
import dev.agarcia.taskard.data.dto.invitation.GetInvitationsDTO;
import dev.agarcia.taskard.data.enums.InvitationStatus;
import dev.agarcia.taskard.data.enums.Role;
import dev.agarcia.taskard.data.models.invitation.Invitation;
import dev.agarcia.taskard.data.models.invitation.InvitationService;
import dev.agarcia.taskard.data.models.project.Project;
import dev.agarcia.taskard.data.models.project.ProjectService;
import dev.agarcia.taskard.data.models.user.User;
import dev.agarcia.taskard.data.models.user.UserService;
import dev.agarcia.taskard.data.models.userproject.UserProject;
import dev.agarcia.taskard.data.models.userproject.UserProjectService;
import dev.agarcia.taskard.data.responses.Response;
import dev.agarcia.taskard.data.responses.ResponseState;
import dev.agarcia.taskard.exceptions.UserNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class InvitationsService {

    @Autowired
    private InvitationService invitationServiceDAO;

    @Autowired
    private ProjectService projectServiceDAO;

    @Autowired
    private UserService userServiceDAO;

    @Autowired
    private UserProjectService userProjectServiceDAO;

    private final ModelMapper modelMapper = new ModelMapper();

    public Response createInvitation(CreateInvitationDTO dto) {
        User inviter = userServiceDAO.getByEmail(SecurityContextHolder.getContext().getAuthentication().getName()).orElse(null);

        User invitedUser = userServiceDAO.getByEmail(dto.getEmail())
                .orElseThrow(() -> new UserNotFoundException("The user " + dto.getEmail() + " has not been found"));

        Project project = projectServiceDAO.findById(dto.getProjectId());

        try {
            Invitation invitation = Invitation.builder()
                    .invitedUser(invitedUser)
                    .project(project)
                    .inviter(inviter)
                    .status(InvitationStatus.PENDING)
                    .build();

            invitationServiceDAO.save(invitation);

            return new Response(ResponseState.OK, "Invitation sended successfully");
        } catch (Exception e) {
            return new Response(ResponseState.ERROR, e.getMessage());
        }
    }

    public Response getInvitationsByUser() {
        try {
            User user = userServiceDAO.getByEmail(SecurityContextHolder.getContext().getAuthentication().getName()).orElse(null);

            List<Invitation> invitations = invitationServiceDAO.findByInvitedUserId(user.getId());

            List<GetInvitationsDTO> invitationsDTO = invitations.stream()
                    .map(invitation -> modelMapper.map(invitation, GetInvitationsDTO.class))
                    .collect(Collectors.toList());

            return new Response(ResponseState.OK, invitationsDTO);
        } catch (Exception e) {
            return new Response(ResponseState.ERROR, e.getMessage());
        }
    }

    public Response acceptInvitation(AcceptInvitationDTO body) {
        try {
            User invitedUser = userServiceDAO.getByEmail(SecurityContextHolder.getContext().getAuthentication().getName()).orElse(null);

            Project project = projectServiceDAO.findById(body.getProjectId());

            UserProject userProject = UserProject.builder()
                            .user(invitedUser)
                            .project(project)
                            .role(Role.MEMBER)
                            .build();

            userProjectServiceDAO.save(userProject);

            invitationServiceDAO.deleteById(body.getInvitationId());

            return new Response(ResponseState.OK, "Invitation accepted successfully");
        } catch (Exception e) {
            return new Response(ResponseState.ERROR, e.getMessage());
        }
    }

    public Response rejectInvitation(Long invitationId) {
        try {
            invitationServiceDAO.deleteById(invitationId);

            Invitation deletedInvitation = invitationServiceDAO.findById(invitationId);

            if (deletedInvitation == null) {
                return new Response(ResponseState.OK, "Invitation deleted successfully");
            } else {
                return new Response(ResponseState.ERROR, "Error deleting the invitation");
            }
        } catch (Exception e) {
            return new Response(ResponseState.ERROR, e.getMessage());
        }
    }
}
