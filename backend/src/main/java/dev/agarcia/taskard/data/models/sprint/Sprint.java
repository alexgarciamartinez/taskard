package dev.agarcia.taskard.data.models.sprint;

import dev.agarcia.taskard.data.models.project.Project;
import dev.agarcia.taskard.data.models.task.Task;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Sprint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @OneToMany(mappedBy = "sprint", cascade = CascadeType.ALL)
    private List<Task> tasks = new ArrayList<>();

    @Column(name = "is_started")
    private boolean isStarted;

    @Column(name = "sprint_counter")
    private Integer sprintCounter;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

}
