package dev.agarcia.taskard.data.models.project;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProjectService {

    void save(Project project);

    List<Project> getAll();

    Project findById(Long id);
}
