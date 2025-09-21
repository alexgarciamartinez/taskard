package dev.agarcia.taskard.data.models.sprint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SprintServiceImpl implements SprintService {

    @Autowired
    private SprintRepository sprintRepository;

    @Override
    public void save(Sprint sprint) {
        this.sprintRepository.save(sprint);
    }

    @Override
    public List<Sprint> findAllByProjectId(Long projectId) {
        return this.sprintRepository.findAllByProjectId(projectId);
    }
}
