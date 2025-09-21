package dev.agarcia.taskard.data.models.userproject;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserProjectRepository extends JpaRepository<UserProject, Long> {

    @Query("SELECT up FROM UserProject up WHERE up.user.id = :userId")
    List<UserProject> findAllByUserId(@Param("userId") Long  userId);

    @Query("SELECT up FROM UserProject up WHERE up.project.id = :projectId")
    List<UserProject> findAllByProjectId(@Param("projectId") Long projectId);

    UserProject findByProjectId(Long projectId);
}
