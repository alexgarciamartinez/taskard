package dev.agarcia.taskard.data.models.sprint;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface SprintService {

    void save(Sprint sprint);

    List<Sprint> findAllByProjectId(Long projectId);
}
