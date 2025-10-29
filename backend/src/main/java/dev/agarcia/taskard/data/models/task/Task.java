package dev.agarcia.taskard.data.models.task;

import dev.agarcia.taskard.data.enums.Priority;
import dev.agarcia.taskard.data.enums.TaskStatus;
import dev.agarcia.taskard.data.models.project.Project;
import dev.agarcia.taskard.data.models.sprint.Sprint;
import dev.agarcia.taskard.data.models.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description", columnDefinition = "LONGTEXT")
    private String description;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

    @ManyToOne
    @JoinColumn(name = "assignee_id")
    private User assignee;

    @Column(name = "duedate")
    private LocalDate dueDate;

    @ManyToOne
    @JoinColumn(name = "sprint_id")
    private Sprint sprint;

    @Enumerated(EnumType.STRING)
    @Column(name = "priority")
    private Priority priority;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private TaskStatus status;
}
