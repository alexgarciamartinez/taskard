package dev.agarcia.taskard.controller.project;

import dev.agarcia.taskard.data.dto.project.CreateProjectDTO;
import dev.agarcia.taskard.services.project.ProjectsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/project")
public class ProjectController {

    @Autowired
    private ProjectsService projectsService;

    @PostMapping("/create")
    public ResponseEntity<?> createProject(@RequestBody CreateProjectDTO body) {
        return projectsService.createProject(body).toResponseEntity();
    }

    @GetMapping("/get-by-user")
    public ResponseEntity<?> getByUser() {
        return projectsService.getProjectsByUserId().toResponseEntity();
    }
}
