package dev.agarcia.taskard.data.models.userproject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserProjectServiceImpl implements UserProjectService {

    @Autowired
    private UserProjectRepository userProjectRepository;

    @Override
    public void save(UserProject userProject) {
        this.userProjectRepository.save(userProject);
    }

    @Override
    public List<UserProject> findAllByUserId(Long userId) {
        return this.userProjectRepository.findAllByUserId(userId);
    }

    @Override
    public List<UserProject> findAllByProjectId(Long projectId) {
        return this.userProjectRepository.findAllByProjectId(projectId);
    }

    @Override
    public UserProject findByProjectId(Long projectId) {
        return this.userProjectRepository.findByProjectId(projectId);
    }
}
