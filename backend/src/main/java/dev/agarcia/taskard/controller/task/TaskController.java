package dev.agarcia.taskard.controller.task;

import dev.agarcia.taskard.data.dto.task.CreateTaskDTO;
import dev.agarcia.taskard.data.dto.task.MoveTaskToSprintDTO;
import dev.agarcia.taskard.data.dto.task.UpdateTaskDTO;
import dev.agarcia.taskard.services.task.TasksService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/task")
public class TaskController {

    @Autowired
    private TasksService tasksService;

    @PostMapping("/create")
    public ResponseEntity<?> createTask(@RequestBody @Valid CreateTaskDTO body) {
        return this.tasksService.createTask(body).toResponseEntity();
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateTask(@RequestBody @Valid UpdateTaskDTO body) {
        return this.tasksService.updateTask(body).toResponseEntity();
    }

    @DeleteMapping("/delete/{taskId}")
    public ResponseEntity<?> deleteTask(@PathVariable Long taskId) {
        return this.tasksService.deleteTaskById(taskId).toResponseEntity();
    }

    @GetMapping("/{projectId}/get-by-project")
    public ResponseEntity<?> getTasksByProject(@PathVariable Long projectId) {
        return this.tasksService.getAllTasksByProject(projectId).toResponseEntity();
    }

    @GetMapping("/{projectId}/get-backlog-tasks-by-project")
    public ResponseEntity<?> getBacklogTasksByProject(@PathVariable Long projectId) {
        return this.tasksService.getAllBacklogTasksByProject(projectId).toResponseEntity();
    }

    @PostMapping("/move-task")
    public ResponseEntity<?> moveTaskToSprint(@RequestBody MoveTaskToSprintDTO body) {
        return this.tasksService.moveTaskToSprint(body).toResponseEntity();
    }
}
