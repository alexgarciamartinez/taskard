package dev.agarcia.taskard.data.models.project;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Override
    public void save(Project project) {
        this.projectRepository.save(project);
    }

    @Override
    public List<Project> getAll() {
        return this.projectRepository.findAll();
    }

    @Override
    public Project findById(Long id) {
        return this.projectRepository.findById(id).orElse(null);
    }
}
