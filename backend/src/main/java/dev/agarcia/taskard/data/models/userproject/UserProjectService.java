package dev.agarcia.taskard.data.models.userproject;

import org.springframework.stereotype.Service;

import java.util.List;

public interface UserProjectService {

    void save(UserProject userProject);

    List<UserProject> findAllByUserId(Long userId);

    List<UserProject> findAllByProjectId(Long projectId);

    UserProject findByProjectId(Long projectId);

}
