package dev.agarcia.taskard.data.models.project;

import dev.agarcia.taskard.data.models.invitation.Invitation;
import dev.agarcia.taskard.data.models.sprint.Sprint;
import dev.agarcia.taskard.data.models.task.Task;
import dev.agarcia.taskard.data.models.user.User;
import dev.agarcia.taskard.data.models.userproject.UserProject;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)  // fetch LAZY para evitar cargas innecesarias
    @JoinColumn(name = "owner_id")
    private User owner;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Task> tasks = new ArrayList<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Sprint> sprints = new ArrayList<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserProject> userProjects = new ArrayList<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private List<Invitation> invitations = new ArrayList<>();

    @Column(name = "sprint_counter")
    private Integer sprintCounter;

}
