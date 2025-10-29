package dev.agarcia.taskard.services.task;

import dev.agarcia.taskard.data.dto.task.CreateTaskDTO;
import dev.agarcia.taskard.data.dto.task.MoveTaskToSprintDTO;
import dev.agarcia.taskard.data.dto.task.TaskDTO;
import dev.agarcia.taskard.data.dto.task.UpdateTaskDTO;
import dev.agarcia.taskard.data.models.project.Project;
import dev.agarcia.taskard.data.models.project.ProjectService;
import dev.agarcia.taskard.data.models.sprint.Sprint;
import dev.agarcia.taskard.data.models.sprint.SprintService;
import dev.agarcia.taskard.data.models.task.Task;
import dev.agarcia.taskard.data.models.task.TaskService;
import dev.agarcia.taskard.data.models.user.User;
import dev.agarcia.taskard.data.models.user.UserService;
import dev.agarcia.taskard.data.responses.Response;
import dev.agarcia.taskard.data.responses.ResponseState;
import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TasksService {

    @Autowired
    private TaskService taskServiceDAO;

    @Autowired
    private ProjectService projectServiceDAO;

    @Autowired
    private UserService userServiceDAO;

    @Autowired
    private SprintService sprintServiceDAO;

    private ModelMapper modelMapper = new ModelMapper();

    public Response createTask(CreateTaskDTO dto) {
        try {
            User user = userServiceDAO.getById(dto.getAssigneeId());

            Project project = projectServiceDAO.findById(dto.getProjectId());

            Task task = Task.builder()
                    .title(dto.getTitle())
                    .description(sanitizeHtml(dto.getDescription()))
                    .project(project)
                    .assignee(user)
                    .dueDate(dto.getDuedate())
                    .priority(dto.getPriority())
                    .status(dto.getStatus())
                    .build();

            this.taskServiceDAO.save(task);

            TaskDTO taskDTO = modelMapper.map(task, TaskDTO.class);

            return new Response(ResponseState.OK, taskDTO);
        } catch (Exception e) {
            return new Response(ResponseState.ERROR, e.getMessage());
        }
    }

    public Response updateTask(UpdateTaskDTO dto) {
        try {
            Task updatedTask = this.taskServiceDAO.findById(dto.getId());

            updatedTask.setTitle(dto.getTitle());
            updatedTask.setDescription(dto.getDescription());
            updatedTask.setAssignee(userServiceDAO.getById(dto.getAssigneeId()));
            updatedTask.setDueDate(dto.getDuedate());
            updatedTask.setStatus(dto.getStatus());

            this.taskServiceDAO.save(updatedTask);

            TaskDTO taskDTO = modelMapper.map(updatedTask, TaskDTO.class);

            return new Response(ResponseState.OK, taskDTO);
        } catch (Exception e) {
            return new Response(ResponseState.ERROR, e.getMessage());
        }
    }

    public Response deleteTaskById(Long id) {
        if (!this.taskServiceDAO.existsById(id)) {
            return new Response(ResponseState.ERROR, "Task with id " + id + "does not exist");
        }

        try {
            this.taskServiceDAO.deleteById(id);

            return new Response(ResponseState.OK, "Task deleted successfully");
        } catch (Exception e) {
            return new Response(ResponseState.ERROR, e.getMessage());
        }
    }

    public Response getAllTasksByProject(Long projectId) {
        try {
            List<Task> tasks = this.taskServiceDAO.findAllByProject_Id(projectId);

            List<TaskDTO> tasksDTO = tasks.stream()
                    .map(task -> modelMapper.map(task, TaskDTO.class))
                    .collect(Collectors.toList());

            return new Response(ResponseState.OK, tasksDTO);
        } catch (Exception e) {
            return new Response(ResponseState.ERROR, e.getMessage());
        }
    }

    public Response getAllBacklogTasksByProject(Long projectId) {
        try {
            List<Task> tasks = this.taskServiceDAO.findAllByProjectIdAndSprintIsNull(projectId);

            List<TaskDTO> tasksDTO = tasks.stream()
                    .map(task -> modelMapper.map(task, TaskDTO.class))
                    .collect(Collectors.toList());

            return new Response(ResponseState.OK, tasksDTO);
        } catch (Exception e) {
            return new Response(ResponseState.ERROR, e.getMessage());
        }
    }

    public Response moveTaskToSprint(MoveTaskToSprintDTO body) {
        try {
            Task taskToMove = this.taskServiceDAO.findById(body.getTaskId());

            Sprint taskCurrentSprint = taskToMove.getSprint();

            boolean movingToBacklog = body.getSprintId() == 0;

            if (taskCurrentSprint != null) {
                taskCurrentSprint.getTasks().remove(taskToMove);
            }

            if (movingToBacklog) {
                taskToMove.setSprint(null);
            } else {
                Sprint destinySprint = this.sprintServiceDAO.findById(body.getSprintId());

                taskToMove.setSprint(destinySprint);

                destinySprint.getTasks().add(taskToMove);
            }

            taskServiceDAO.save(taskToMove);

            return new Response(ResponseState.OK, "Task moved successfully");
        } catch (Exception e) {
            return new Response(ResponseState.ERROR, "Error moving the task to a sprint: " + e.getMessage());
        }
    }

    public String sanitizeHtml(String html) {
        return Jsoup.clean(html, Safelist.basic());
    }
}
