package dev.agarcia.taskard.services.user;

import dev.agarcia.taskard.data.dto.user.GetUsersByProjectDTO;
import dev.agarcia.taskard.data.models.user.User;
import dev.agarcia.taskard.data.models.user.UserService;
import dev.agarcia.taskard.data.models.userproject.UserProject;
import dev.agarcia.taskard.data.models.userproject.UserProjectService;
import dev.agarcia.taskard.data.responses.Response;
import dev.agarcia.taskard.data.responses.ResponseState;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsersService {

    @Autowired
    private UserProjectService userProjectService;

    private ModelMapper modelMapper = new ModelMapper();

    public Response getUsersByProject(Long projectId) {
        try {
            List<UserProject> userProjects = userProjectService.findAllByProjectId(projectId);

            List<GetUsersByProjectDTO> usersDTO = userProjects.stream()
                    .map(up -> {
                        User user = up.getUser();
                        GetUsersByProjectDTO dto = modelMapper.map(user, GetUsersByProjectDTO.class);
                        dto.setRole(up.getRole());
                        return dto;
                    })
                    .collect(Collectors.toList());

            return new Response(ResponseState.OK, usersDTO);
        } catch (Exception e) {
            return new Response(ResponseState.ERROR, e.getMessage());
        }
    }
}
