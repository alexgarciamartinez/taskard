package dev.agarcia.taskard.services.sprints;

import dev.agarcia.taskard.data.dto.sprint.CreateSprintDTO;
import dev.agarcia.taskard.data.dto.sprint.GetSprintDTO;
import dev.agarcia.taskard.data.models.project.Project;
import dev.agarcia.taskard.data.models.project.ProjectService;
import dev.agarcia.taskard.data.models.sprint.Sprint;
import dev.agarcia.taskard.data.models.sprint.SprintService;
import dev.agarcia.taskard.data.responses.Response;
import dev.agarcia.taskard.data.responses.ResponseState;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SprintsService {

    @Autowired
    private SprintService sprintServiceDAO;

    @Autowired
    private ProjectService projectServiceDAO;

    private ModelMapper modelMapper = new ModelMapper();

    public Response createSprint(CreateSprintDTO dto) {
        try {
            Project project = projectServiceDAO.findById(dto.getProjectId());

            project.setSprintCounter(project.getSprintCounter() + 1);

            projectServiceDAO.save(project);

            Sprint sprint = Sprint.builder()
                    .project(project)
                    .sprintCounter(project.getSprintCounter())
                    .build();

            sprintServiceDAO.save(sprint);

            GetSprintDTO sprintDTO = modelMapper.map(sprint, GetSprintDTO.class);

            return new Response(ResponseState.OK, sprintDTO);
        } catch (Exception e) {
            return new Response(ResponseState.ERROR, "Error creating sprint: " + e.getMessage());
        }
    }

    public Response getAllSprintsByProject(Long projectId) {
        try {
            List<Sprint> sprints = sprintServiceDAO.findAllByProjectId(projectId);

            List<GetSprintDTO> sprintsDTO = sprints.stream()
                    .map(sprint -> modelMapper.map(sprint, GetSprintDTO.class))
                    .collect(Collectors.toList());

            return new Response(ResponseState.OK, sprintsDTO);
        } catch (Exception e) {
            return new Response(ResponseState.ERROR, "Error getting project's sprints => " + e.getMessage());
        }
    }
}
