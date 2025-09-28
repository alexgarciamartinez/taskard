package dev.agarcia.taskard.data.models.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public void save(Task task) {
        this.taskRepository.save(task);
    }

    @Override
    public List<Task> findAllByProject_Id(Long projectId) {
        return this.taskRepository.findAllByProject_Id(projectId);
    }

    @Override
    public List<Task> findAllByProjectIdAndSprintIsNull(Long projectId) {
        return this.taskRepository.findAllByProjectIdAndSprintIsNull(projectId);
    }

    @Override
    public Task findById(Long id) {
        return this.taskRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteById(Long id) {
        this.taskRepository.deleteById(id);
    }

    @Override
    public boolean existsById(Long id) {
        return this.taskRepository.existsById(id);
    }
}
