package dev.agarcia.taskard.data.models.user;

import dev.agarcia.taskard.data.models.invitation.Invitation;
import dev.agarcia.taskard.data.models.project.Project;
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
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "username")
    private String name;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    private List<Project> ownedProjects = new ArrayList<>();

    /*@ManyToMany(mappedBy = "users")
    private List<Project> projects = new ArrayList<>();*/
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserProject> userProjects = new ArrayList<>();

    @OneToMany(mappedBy = "invitedUser", cascade = CascadeType.ALL)
    private List<Invitation> invitations = new ArrayList<>();

}
