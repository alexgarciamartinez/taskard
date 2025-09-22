package dev.agarcia.taskard.controller.sprint;

import dev.agarcia.taskard.data.dto.sprint.CreateSprintDTO;
import dev.agarcia.taskard.services.sprints.SprintsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sprint")
public class SprintController {

    @Autowired
    private SprintsService sprintsServices;

    @PostMapping("/create")
    public ResponseEntity<?> createSprint(@RequestBody CreateSprintDTO body) {
        return this.sprintsServices.createSprint(body).toResponseEntity();
    }
}
