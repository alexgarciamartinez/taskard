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
}
