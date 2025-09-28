package dev.agarcia.taskard.data.models.task;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TaskService {

    void save(Task task);

    List<Task> findAllByProject_Id(Long projectId);

    List<Task> findAllByProjectIdAndSprintIsNull(Long projectId);

    Task findById(Long id);

    void deleteById(Long id);

    boolean existsById(Long id);
}
