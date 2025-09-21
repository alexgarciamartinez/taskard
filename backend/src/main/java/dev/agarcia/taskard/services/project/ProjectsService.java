package dev.agarcia.taskard.services.project;

import dev.agarcia.taskard.data.dto.project.CreateProjectDTO;
import dev.agarcia.taskard.data.dto.project.GetProjectsDTO;
import dev.agarcia.taskard.data.enums.Role;
import dev.agarcia.taskard.data.models.project.Project;
import dev.agarcia.taskard.data.models.project.ProjectService;
import dev.agarcia.taskard.data.models.user.User;
import dev.agarcia.taskard.data.models.user.UserService;
import dev.agarcia.taskard.data.models.userproject.UserProject;
import dev.agarcia.taskard.data.models.userproject.UserProjectService;
import dev.agarcia.taskard.data.responses.Response;
import dev.agarcia.taskard.data.responses.ResponseState;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectsService {

    @Autowired
    private ProjectService projectServiceDAO;

    @Autowired
    private UserService userServiceDAO;

    @Autowired
    private UserProjectService userProjectServiceDAO;

    private ModelMapper modelMapper = new ModelMapper();

    public Response createProject(CreateProjectDTO body) {
        try {
            String email = SecurityContextHolder.getContext().getAuthentication().getName();

            User owner = userServiceDAO.getByEmail(email).orElse(null);

            Project project = Project.builder()
                    .name(body.getName())
                    .owner(owner)
                    .build();

            projectServiceDAO.save(project);

            UserProject userProject = UserProject.builder()
                    .user(owner)
                    .project(project)
                    .role(Role.OWNER)
                    .build();

            userProjectServiceDAO.save(userProject);

            return new Response(ResponseState.OK, "Proyecto creado correctamente");
        } catch (Exception e) {
            return new Response(ResponseState.ERROR, e.getMessage());
        }
    }

    public Response getProjectsByUserId() {
        try {
            String email = SecurityContextHolder.getContext().getAuthentication().getName();

            User user = userServiceDAO.getByEmail(email).orElse(null);

            List<UserProject> userProjects = this.userProjectServiceDAO.findAllByUserId(user.getId());

            List<GetProjectsDTO> DTOprojects = userProjects.stream()
                    .map(up -> modelMapper.map(up.getProject(), GetProjectsDTO.class))
                    .collect(Collectors.toList());

            return new Response(ResponseState.OK, DTOprojects);
        } catch (Exception e) {
            return new Response(ResponseState.ERROR, e.getMessage());
        }
    }

}
